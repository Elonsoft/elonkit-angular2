/* eslint-disable brace-style */
import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewEncapsulation,
  OnInit,
  Input,
  ViewChild,
  HostBinding,
  Optional,
  Self,
  Host,
  ElementRef,
} from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, NgControl } from '@angular/forms';
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatFormFieldControl } from '@angular/material/form-field';

import { Subject } from 'rxjs';

import { ERangeOption, IRangeOption, IRangeSelect } from './range-measure-select.interface';

@Component({
  selector: 'es-range-measure-select',
  templateUrl: './range-measure-select.component.html',
  styleUrls: ['./range-measure-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: MatFormFieldControl, useExisting: RangeMeasureSelectComponent }],
})
export class RangeMeasureSelectComponent implements MatFormFieldControl<IRangeSelect>, ControlValueAccessor, OnInit {
  /**
   * @ignore
   */
  public readonly RangeOption = ERangeOption;

  /**
   * @ignore
   */
  private static nextId = 0;

  /**
   * @ignore
   */
  @HostBinding() public id = `range-measure-select-${RangeMeasureSelectComponent.nextId++}`;

  /**
   * @ignore
   */
  @HostBinding('style.display') public styleDisplay = 'block';

  /**
   * @ignore
   */
  @HostBinding('style.width') public styleWidth = '100%';

  /**
   * @ignore
   */
  @ViewChild('startInput') private startInput?: ElementRef<HTMLInputElement>;

  /**
   * @ignore
   */
  @ViewChild('endInput') private endInput?: ElementRef<HTMLInputElement>;

  /**
   * @ignore
   */
  @ViewChild('arrow') private arrow?: MatButton;

  @Input()
  public get placeholder() {
    return this._placeholder;
  }
  public set placeholder(placeholder) {
    this._placeholder = placeholder;
    this.stateChanges.next();
  }

  /**
   * @ignore
   */
  private _placeholder!: string;

  @Input()
  public get required() {
    return this._required;
  }
  public set required(required) {
    this._required = coerceBooleanProperty(required);
    this.stateChanges.next();
  }

  /**
   * @ignore
   */
  private _required = false;

  @Input()
  public get disabled() {
    return this._disabled;
  }
  public set disabled(disabled) {
    this._disabled = coerceBooleanProperty(disabled);
    this.stateChanges.next();
  }

  /**
   * @ignore
   */
  private _disabled = false;

  @Input() public measuringUnit = '';
  @Input() public startOptionVariants: string[] = [];
  @Input() public endOptionVariants: string[] = [];
  @Input() public minValue = 1;
  @Input() public maxValue = 9999;

  /**
   * @ignore
   */
  public startOptionVariantsTransformed: IRangeOption[] = [];

  /**
   * @ignore
   */
  public endOptionVariantsTransformed: IRangeOption[] = [];

  /**
   * @ignore
   */
  public invalid = false;

  public get value(): IRangeSelect {
    return this._value;
  }

  public set value(value: IRangeSelect) {
    this._value = value;
  }

  /**
   * @ignore
   */
  private _value: IRangeSelect = {
    start: null,
    end: null,
  };

  public get isValueEmpty(): boolean {
    return !this.value || (!this.value?.start && !this.value?.end);
  }

  /**
   * @ignore
   */
  public describedBy = '';

  /**
   * @ignore
   */
  public stateChanges = new Subject<void>();

  /**
   * @ignore
   */
  public isOpen = false;

  /**
   * @ignore
   */
  public width = 0;

  public get empty() {
    return !this.value || (!this.value?.start && !this.value?.end);
  }

  /**
   * @ignore
   */
  public focused = false;

  /**
   * @ignore
   */
  @HostBinding('class.floating')
  public get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  /**
   * @ignore
   */
  public origin!: CdkOverlayOrigin;

  public get errorState(): boolean {
    const control = this.ngControl;
    const form = this.ngForm;

    if (control) {
      return !!(control.invalid && (control.touched || form?.submitted));
    }

    return false;
  }

  constructor(
    /**
     * @ignore
     */
    @Optional() @Self() public ngControl: NgControl,

    /**
     * @ignore
     */
    @Optional() public ngForm: FormGroupDirective,
    @Optional() @Host() private matFormField: MatFormField,
    private changeDetectorRef: ChangeDetectorRef,
    private focusMonitor: FocusMonitor
  ) {
    if (this.ngControl !== null) {
      this.ngControl.valueAccessor = this as any;
    }
  }

  /**
   * @ignore
   */
  public ngOnInit() {
    if (this.matFormField) {
      this.origin = new CdkOverlayOrigin(this.matFormField.getConnectedOverlayOrigin());
    }

    this.stateChanges.subscribe(() => {
      this.changeDetectorRef.detectChanges();
    });

    this.setInitialOptionsVariants();
  }

  /**
   * @ignore
   */
  public setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  /**
   * @ignore
   */
  public onContainerClick() {
    this.isOpen = true;
    if (this.matFormField) {
      this.width = this.matFormField._elementRef.nativeElement.clientWidth;
    }
    this.stateChanges.next();
  }

  /**
   * @ignore
   */
  public onBlur(rangeOption: ERangeOption) {
    const startElement = this.startInput?.nativeElement;
    const endElement = this.endInput?.nativeElement;

    const startValue = startElement?.value;
    const endValue = endElement?.value;

    if (!!startValue && !!endValue && +startValue > +endValue) {
      switch (rangeOption) {
        case ERangeOption.start:
          startElement.value = '';

          this.endOptionVariantsTransformed = this.getOptionVariantsByType(ERangeOption.end);

          break;
        case ERangeOption.end:
          endElement.value = '';

          this.startOptionVariantsTransformed = this.getOptionVariantsByType(ERangeOption.start);

          break;
        default:
          break;
      }
    }

    if (rangeOption === ERangeOption.start && !!startValue && (+startValue < this.minValue || +startValue > this.maxValue)) {
      startElement.value = '';

      this.endOptionVariantsTransformed = this.getOptionVariantsByType(ERangeOption.end);
    }

    if (rangeOption === ERangeOption.end && !!endValue && (+endValue < this.minValue || +endValue > this.maxValue)) {
      endElement.value = '';

      this.startOptionVariantsTransformed = this.getOptionVariantsByType(ERangeOption.start);
    }

    this.stateChanges.next();
  }

  /**
   * @ignore
   */
  public writeValue(value: IRangeSelect) {
    if (value === this.value) {
      return;
    }

    if (value.start === null && value.end === null) {
      this.setInitialOptionsVariants();
    }

    this.value = value;
    this.invalid = this.value.end && this.value.start ? +this.value.end < +this.value.start : false;

    if (!this.invalid || !this.value?.end) {
      this.onChange(value);
    }

    this.changeDetectorRef.detectChanges();
  }

  /**
   * @ignore
   */
  public registerOnChange(onChange: (value: any) => void) {
    this.onChange = onChange;
  }

  /**
   * @ignore
   */
  public onChange = (value: IRangeSelect) => {};

  /**
   * @ignore
   */
  public registerOnTouched(onTouched: () => void) {
    this.onTouched = onTouched;
  }

  /**
   * @ignore
   */
  public onTouched = () => {};

  /**
   * @ignore
   */
  public onClose(shouldFocusArrow?: boolean) {
    this.writeValue({
      start: this.startInput?.nativeElement.value ?? null,
      end: this.endInput?.nativeElement.value ?? null,
    });

    this.onTouched();
    this.isOpen = false;

    if (shouldFocusArrow && this.arrow) {
      this.focusMonitor.focusVia(this.arrow._elementRef.nativeElement, 'keyboard');
    }

    this.stateChanges.next();
  }

  /**
   * @ignore
   */
  public onMatOptionSelectionChange(option: IRangeOption) {
    const { value } = option;

    if (option.type === ERangeOption.start) {
      const options = this.getOptionVariantsByType(ERangeOption.end);

      this.endOptionVariantsTransformed = options.filter((o) => (o.value && value ? +o.value >= +value : true));

      if (this.startInput?.nativeElement) {
        this.startInput.nativeElement.value = option.value as string;
      }
    } else {
      const options = this.getOptionVariantsByType(ERangeOption.start);

      this.startOptionVariantsTransformed = options.filter((o) => (o.value && value ? +o.value <= +value : true));

      if (this.endInput?.nativeElement) {
        this.endInput.nativeElement.value = option.value as string;
      }
    }
  }

  /**
   * @ignore
   */
  public onChangeStartInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const inputValue = target.value;

    this.endOptionVariantsTransformed = inputValue?.length
      ? this.getOptionVariantsByType(ERangeOption.end).filter((option) => (option.value ? +option.value >= +inputValue : false))
      : this.getOptionVariantsByType(ERangeOption.end);
  }

  /**
   * @ignore
   */
  public onChangeEndInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const inputValue = target.value;

    this.startOptionVariantsTransformed = inputValue?.length
      ? this.getOptionVariantsByType(ERangeOption.start).filter((option) => (option.value ? +option.value <= +inputValue : false))
      : this.getOptionVariantsByType(ERangeOption.start);
  }

  /**
   * @ignore
   */
  public onResetValue(event: Event) {
    event.stopPropagation();

    this.setInitialOptionsVariants();

    this.writeValue({ start: null, end: null });
  }

  /**
   * @ignore
   */
  public compareFn(optionOne: IRangeOption, optionTwo: IRangeOption): boolean {
    return optionOne.value === optionTwo.value && optionOne.type === optionTwo.type;
  }

  /**
   * @ignore
   */
  public trackByIndex(index: number): number {
    return index;
  }

  /**
   * @ignore
   */
  public isSelected(option: IRangeOption): boolean {
    const start = this.startInput?.nativeElement.value ?? this.value.start;
    const end = this.endInput?.nativeElement.value ?? this.value.end;

    return option.type === ERangeOption.start ? start === option.value : end === option.value;
  }

  /**
   * @ignore
   */
  private setInitialOptionsVariants() {
    this.startOptionVariantsTransformed = this.getOptionVariantsByType(ERangeOption.start);
    this.endOptionVariantsTransformed = this.getOptionVariantsByType(ERangeOption.end);
  }

  /**
   * @ignore
   */
  private getOptionVariantsByType(type: ERangeOption): IRangeOption[] {
    switch (type) {
      case ERangeOption.start: {
        return this.startOptionVariants?.map((variant: string) => ({
          value: variant,
          type: ERangeOption.start,
        }));
      }

      case ERangeOption.end: {
        return this.endOptionVariants?.map((variant: string) => ({
          value: variant,
          type: ERangeOption.end,
        }));
      }
    }
  }
}
