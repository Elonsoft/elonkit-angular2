import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-wrapper',
  template: `

  <form [formGroup]="testGroup">
    <es-password-field
      formControlName="password"
      [required]="required"
      [disabled]="disabled"
      [visible]="visible"
      [placeholder]="placeholder">
    </es-password-field>
  </form>



    <div>Fom data: {{ testGroup.get('password')?.value }}</div>
  `,
})
export class DemoWrapperComponent {
  @Input() public required = false;
  @Input() public disabled = false;
  @Input() public visible!: boolean;
  @Input() public multiple = false;
  @Input() public placeholder = '';

  public testGroup: FormGroup;

  constructor() {
    this.testGroup = new FormGroup({
      password: new FormControl('', [Validators.required]),
    });

    this.testGroup.valueChanges.subscribe((val) => console.log(val, this.testGroup));
  }
}
