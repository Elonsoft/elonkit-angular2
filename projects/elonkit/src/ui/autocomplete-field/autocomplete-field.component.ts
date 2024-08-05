import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  Host,
  HostBinding,
  Input,
  OnInit,
  Optional,
  Self,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, FormGroupDirective, NgControl } from '@angular/forms';
import { BehaviorSubject, Observable, of,Subject } from 'rxjs';
import { catchError, debounceTime, shareReplay, switchMap, takeUntil } from 'rxjs/operators';

import { MatButton } from '@angular/material/button';
import { MatFormField, MatFormFieldControl } from '@angular/material/form-field';
import { MatSelectionListChange } from '@angular/material/list';

import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';

@Component({
  selector: 'es-autocomplete-field',
  templateUrl: './autocomplete-field.component.html',
  styleUrls: ['./autocomplete-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: MatFormFieldControl, useExisting: ESAutocompleteFieldComponent }],
})
export class ESAutocompleteFieldComponent implements MatFormFieldControl<any | null>, ControlValueAccessor, OnInit {
  private static nextId = 0;
  @HostBinding() public id = `autocomplete-${ESAutocompleteFieldComponent.nextId++}`;
  @HostBinding('style.display') public styleDisplay = 'block';
  @HostBinding('style.width') public styleWidth = '100%';

  @ViewChild('input') private input?: ElementRef<HTMLInputElement>;
  @ViewChild('arrow') private arrow?: MatButton;

  /**
   * Функция возвращающая данные для вариантов автокомплита.
   */
  @Input() public service: (search: string) => Observable<any[]>;

  /**
   * Функция для преобразования сущности в строку, выводящуюся пользователю.
   */
  @Input() public displayWith!: (option: any) => string;

  public describedBy = '';

  public stateChanges = new Subject<void>();

  public value: any = [];

  public joined: string | null = null;

  public isOpen = false;
  public width = 0;
  public options$: Observable<any[]>;

  public text = '';
  public text$ = new BehaviorSubject('');

  @Input() public selectByKey = '';

  @Input()
  public get placeholder() {
    return this._placeholder;
  }
  public set placeholder(placeholder) {
    this._placeholder = placeholder;
    this.stateChanges.next();
  }
  private _placeholder!: string;

  public get empty() {
    return this._multiple ? !this.value.length : !this.value;
  }

  public focused = false;

  @HostBinding('class.floating')
  public get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @Input()
  public get required() {
    return this._required;
  }
  public set required(required) {
    this._required = coerceBooleanProperty(required);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  public get disabled() {
    return this._disabled;
  }
  public set disabled(disabled) {
    this._disabled = coerceBooleanProperty(disabled);
    this.styleDisabled = this._disabled;
    this.stateChanges.next();
  }
  private _disabled = false;

  public styleDisabled = false;

  @Input()
  public get multiple() {
    return this._multiple;
  }
  public set multiple(multiple) {
    this._multiple = coerceBooleanProperty(multiple);
    this.stateChanges.next();
  }

  private _multiple = false;

  public get errorState(): boolean {
    const control = this.ngControl;

    const touched = !!this.ngControl?.touched;

    if (touched !== this.touched) {
      this.touched = touched;
      this.stateChanges.next();
    }
    return !!(control?.invalid && control.touched);
  }

  public origin!: CdkOverlayOrigin;

  private touched = true;

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    @Optional() public ngForm: FormGroupDirective,
    @Optional() @Host() private matFormField: MatFormField,
    private changeDetectorRef: ChangeDetectorRef,
    private focusMonitor: FocusMonitor,
    private destroyRef: DestroyRef
  ) {
    if (this.ngControl !== null) {
      this.ngControl.valueAccessor = this as any;
    }

    this.options$ = this.text$.pipe(
      debounceTime(400),
      switchMap((text) => this.service(text).pipe(catchError(() => of([])))),
      shareReplay(1)
    );

    this.options$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  public ngOnInit() {
    if (this.matFormField) {
      this.origin = new CdkOverlayOrigin(this.matFormField.getConnectedOverlayOrigin());
    }

    this.stateChanges.subscribe(() => {
      this.changeDetectorRef.detectChanges();
    });
  }

  public setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  public onContainerClick() {
    if (!this._disabled) {
      this.isOpen = true;
    }

    if (this.matFormField) {
      this.width = this.matFormField._elementRef.nativeElement.clientWidth;
    }
    this.stateChanges.next();

    setTimeout(() => {
      if (this.input) {
        this.input.nativeElement.focus();
      }
    });
  }

  public writeValue(value: any) {
    if (value !== undefined) {
      this.value = value;

      this.stateChanges.next();
    }
  }

  public registerOnChange(onChange: (value: any) => void) {
    this.onChange = onChange;
  }

  public onChange = (_: any) => {};

  public registerOnTouched(onTouched: () => void) {
    this.onTouched = onTouched;
  }

  public onTouched = () => {};

  public onClose(shouldFocusArrow?: boolean) {
    this.onTouched();
    this.isOpen = false;

    this.text = '';
    this.text$.next('');

    if (shouldFocusArrow && this.arrow) {
      this.focusMonitor.focusVia(this.arrow._elementRef.nativeElement, 'keyboard');
    }

    this.stateChanges.next();
  }

  public onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.text = value;
    this.text$.next(value);
  }

  public onClear() {
    this.text = '';
    this.text$.next('');
  }

  public onSelectionChange(event: MatSelectionListChange) {
    if (this._multiple) {
      const newValue = this.value.slice();

      event.options
        .map((option) => option.value)
        .forEach((option) => {
          const index = this.selectByKey
            ? newValue.findIndex((o: any) => o[this.selectByKey] === option[this.selectByKey])
            : newValue.findIndex((o: any) => o === option);

          if (index !== -1) {
            newValue.splice(index, 1);
          } else {
            newValue.push(option);
          }
        });

      this.value = newValue;
      this.joined = this.value.map((val: any) => this.displayWith(val)).join(', ');
      this.onChange(newValue);
      this.stateChanges.next();
    } else {
      if (event.options.length) {
        const value = event.options[0].value;
        this.value = value;
        this.onChange(value);
        this.stateChanges.next();

        this.onClose();
      }
    }
  }

  public onResetValue(event: Event) {
    event.stopPropagation();
    const resValue = this.multiple ? [] : null;

    this.value = resValue;
    this.joined = null;
    this.onChange(resValue);
    this.stateChanges.next();
  }

  public isSelected(option: string | any) {
    if (this._multiple) {
      return typeof option === 'string' || !this.selectByKey
        ? !!this.value.find((o: any) => o === option)
        : !!this.value.find((o: any) => o[this.selectByKey] === option[this.selectByKey]);
    } else {
      return typeof option === 'string' || !this.selectByKey
        ? this.value === option
        : this.value && this.value[this.selectByKey] === option[this.selectByKey];
    }
  }
}
