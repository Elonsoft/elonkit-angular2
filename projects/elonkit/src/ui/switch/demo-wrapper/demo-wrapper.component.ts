import { Component, DestroyRef, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-wrapper',
  template: `
    <div class="form-wrapper">
      <form [formGroup]="form" style="display: flex; align-items: center">
        <label for="demoForm" class="es-body-200">ES-Switch</label>
        <es-switch
          id="demoForm"
          name="demo"
          formControlName="demoForm"
          [color]="color"
          [size]="size"
          [disabled]="disabled"
          [indeterminate]="indeterminate"
          [readonly]="readonly"
          [type]="type"
          [defaultChecked]="defaultChecked"
          [autoFocus]="autoFocus"
          (indeterminateEvent)="onIndeterminateClick()"></es-switch>
      </form>

      <br />
      <div class="es-body-100">
        <span>Form value: </span><span>{{ form.valueChanges | async | json }}</span>
      </div>
    </div>
  `,
})
export class DemoWrapperComponent implements OnInit {
  @Input() color = '';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() disabled = true;
  @Input() indeterminate = false;
  @Input() readonly = false;
  @Input() type: 'checkbox' | 'button' = 'checkbox';
  @Input() defaultChecked = false;
  @Input() autoFocus = false;

  public form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private destroyRef: DestroyRef
  ) {}

  public ngOnInit(): void {
    this.form = this.fb.group({
      demoForm: [false, []],
    });

    console.log(this.form);
    this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((val) => console.log(val, this.form));
  }

  public onIndeterminateClick(): void {
    console.log('Indeterminate switch clicked');
  }
}
