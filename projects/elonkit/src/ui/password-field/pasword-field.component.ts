import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'es-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: [ './password-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule, MatInputModule, MatIconModule, MatButtonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ESPasswordFieldComponent),
      multi: true
    }
  ]
})
export class ESPasswordFieldComponent implements ControlValueAccessor {
  @Input() public visible = false;

  public value = '';

  public onChange: any = () => {};
  public onTouch: any = () => {};

  public writeValue(value: any): void {
    this.value = value;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  onInput(event: any): void {
    this.value = event.target.value;
    this.onChange(event.target.value);
    this.onTouch();
  }
}