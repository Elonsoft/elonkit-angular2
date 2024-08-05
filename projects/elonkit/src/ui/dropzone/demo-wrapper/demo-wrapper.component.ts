import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ESDropzoneValidationError } from '..';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-wrapper',
  template: `
    <div>
      <form #f="ngForm" class="form" [formGroup]="form" (ngSubmit)="onSubmit(f)">
        <es-dropzone
          [heading]="heading"
          [subheading]="subheading"
          [accept]="accept"
          [matIcon]="matIcon"
          [svgIcon]="svgIcon"
          [maxSize]="maxSize"
          [type]="type"
          [headingTypography]="headingTypography"
          [subheadingTypography]="subheadingTypography"
          (validate)="onValidate($event)"
          formControlName="docs">
          <mat-hint class="es-caption">This is an example of a hint message</mat-hint>
          <mat-error *ngIf="form.controls.docs.hasError('required')" class="es-caption">Select at least one file</mat-error>
          <mat-error *ngIf="form.controls.docs.hasError('FILE_TYPE')" class="es-caption">Wrong file type</mat-error>
          <mat-error *ngIf="form.controls.docs.hasError('FILE_SIZE')" class="es-caption">File is too heavy</mat-error>
        </es-dropzone>
        <br />
        <button class="form__submit" color="primary" mat-flat-button type="submit">Submit</button>
      </form>
    </div>

    <br />
    <div>
      <h5 class="es-h5">Uploaded</h5>
      <br />
      <span class="es-caption">
        {{ uploadedValue | json }}
      </span>
    </div>

    <br />
    <div>
      <h5 class="es-h5">Uploaded file error</h5>
      <br />
      <span class="es-caption">
        {{ customErr | json }}
      </span>
    </div>
  `,
})
export class DemoWrapperComponent {
  @Input() public heading: string;
  @Input() public subheading: string;
  @Input() public accept: string;
  @Input() public matIcon: string | undefined;
  @Input() public svgIcon: string | undefined;
  @Input() public maxSize: number | undefined;
  @Input() public type: 'base64' | 'binary' | undefined;
  @Input() public headingTypography: string | undefined;
  @Input() public subheadingTypography: string | undefined;

  public form = new FormGroup({
    docs: new FormControl([], [Validators.required]),
  });

  public uploadedValue: any[] = [];

  public customErr: ESDropzoneValidationError[] = [];

  constructor() {}

  public onValidate(e: ESDropzoneValidationError[]): void {
    e.forEach((error) => {
      this.form.controls.docs.setErrors(error.error);
    });
    console.log('errors:', e);
    this.customErr = e;
  }

  public onSubmit(form: any) {
    this.uploadedValue = form.form.value.docs;
    console.log(this.form);
  }
}
