import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  Input,
  forwardRef,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'es-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ESSwitchComponent),
      multi: true,
    },
  ],
  standalone: true,
})
export class ESSwitchComponent implements ControlValueAccessor, AfterViewInit {
  @ViewChild('checkbox') checkboxElement!: ElementRef<HTMLInputElement>;

  /**
   * The color of the component.
   * @default 'mono'
   */
  @Input()
  public get color(): string {
    return this._color;
  }
  public set color(value: string) {
    if (!value) return;
    const paletteColors = ['primary', 'accent', 'warn', 'info', 'positive', 'attention', 'mono'];
    if (paletteColors.some((color) => color === value)) {
      this.paletteColor = value;
    } else {
      this.paletteColor = null;
      this._color = value || '';
    }
  }

  /**
   * @ignore
   */
  private _color = '';

  /**
   * @ignore
   */
  public paletteColor: string | null = null;

  /**
   * If 'button', hitting enter will toggle the switch.
   * @default 'checkbox'
   */
  @Input() type: 'checkbox' | 'button' = 'checkbox';

  /**
   * The size of the component.
   * @default 'medium'
   */
  @Input() size: 'large' | 'medium' | 'small' = 'medium';

  /** If `true`, the component is disabled. */
  @Input() disabled = false;

  /**
   * If `true`, the component appears indeterminate.
   */
  @Input() indeterminate = false;

  /** It prevents the user from changing the value of the field. */
  @Input() readonly = false;

  /** The default checked state. Use when the component is not controlled. */
  @Input() defaultChecked = false;

  /** If `true`, the `input` element is focused during the first mount. */
  @Input() autoFocus = false;

  /** The id of the `input` element. */
  @Input() id = '';

  /** The name of the `input` element. */
  @Input() name = '';

  /**
   * Produces event when user clicks switch in indeterminate state.
   */
  @Output() indeterminateEvevnt = new EventEmitter<boolean>();

  constructor(private cd: ChangeDetectorRef) {}

  public ngAfterViewInit(): void {
    this.checked = this.defaultChecked;
    this.cd.detectChanges();

    if (this.autoFocus) {
      this.focused = true;
      this.checkboxElement.nativeElement.focus();
    }
  }

  /**
   * @ignore
   */
  public checked = false;
  /**
   * @ignore
   */
  public focused = false;
  /**
   * @ignore
   */
  public onChange = (value: boolean) => {};
  /**
   * @ignore
   */
  public onTouched = () => {};

  /**
   * @ignore
   */
  public _toggle() {
    if (!this.disabled && !this.readonly && !this.indeterminate) {
      this.checked = !this.checked;
      this.onChange(this.checked);
      this.onTouched();
    }

    this.checkboxElement.nativeElement.checked = this.checked;
  }

  /**
   * @ignore
   */
  public writeValue(value: boolean): void {
    this.checked = value;
  }

  /**
   * @ignore
   */
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * @ignore
   */
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * @ignore
   */
  public setDisabledState?(isDisabled: boolean): void {
    if (!this.disabled) {
      this.disabled = isDisabled;
    }
  }

  /**
   * @ignore
   */
  public _onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.type === 'button') {
      event.preventDefault();
      this._toggle();

      if (this.indeterminate) {
        this.indeterminateEvevnt.emit(true);
      }
    }
  }

  /**
   * @ignore
   */
  public _onClick(): void {
    if (this.indeterminate) {
      this.indeterminateEvevnt.emit(true);
    }
  }

  /**
   * @ignore
   */
  public _onFocusBlur(event: FocusEvent): void {
    if (!this.disabled) {
      event.preventDefault();
      event.type === 'focus' ? (this.focused = true) : (this.focused = false);
    }
  }
}
