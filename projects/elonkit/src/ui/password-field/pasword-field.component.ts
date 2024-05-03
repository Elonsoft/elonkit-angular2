import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
  Optional,
  Self,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormsModule, NgControl, ValidationErrors } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Subject } from 'rxjs';

@Component({
  selector: 'es-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule, MatInputModule, MatIconModule, MatButtonModule, FormsModule],
  providers: [{ provide: MatFormFieldControl, useExisting: ESPasswordFieldComponent }]
})
export class ESPasswordFieldComponent implements ControlValueAccessor, MatFormFieldControl<string | null> {
  private static nextId = 0;
  @HostBinding() public id = `password-field-${ESPasswordFieldComponent.nextId++}`;
  @ViewChild('input') private input?: ElementRef<HTMLInputElement>;

  @Input()
  public get visible() {
    return this._visible;
  }
  public set visible(value) {
    this._visible = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _visible = false;

  @Input()
  public get placeholder() {
    return this._placeholder;
  }
  public set placeholder(value) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  private _placeholder!: string;

  public get empty() {
    return !this.value;
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
  public set required(value) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  public get disabled() {
    return this._disabled;
  }
  public set disabled(value) {
    this._disabled = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _disabled = false;

  get errorState(): boolean {
    const control = this.ngControl;

    const touched = !!this.ngControl?.touched;

    if (touched !== this.touched) {
      this.touched = touched;
      this.stateChanges.next();
    }
    return !!(control?.invalid && control.touched);
  }

  private touched = true;

  public describedBy = '';

  public stateChanges = new Subject<void>();

  public value = '';

  public onChange: any = () => {};
  public onTouch: any = () => {};

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl !== null) {
      this.ngControl.valueAccessor = this as any;
    }
  }

  public setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  public onContainerClick() {
    this.stateChanges.next();

    setTimeout(() => {
      if (this.input) {
        this.input.nativeElement.focus();
      }
    });
  }

  public writeValue(value: any): void {
    this.value = value;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  public onInput(event: Event): void {
    this.value = (event.target as HTMLInputElement).value;
    this.onChange(this.value);
    this.onTouch();
  }
}
