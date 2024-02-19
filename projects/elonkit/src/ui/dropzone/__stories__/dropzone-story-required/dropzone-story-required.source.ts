export const DROPZONE_STORY_REQUIRED_SOURCE = {
  ts: `
  export class AppComponent {
    public form = new FormGroup({
      docs: new FormControl([], Validators.required)
    });
    ...
    public onSubmit(form: any) {}
  }
  `,
  html: `
  <form #f="ngForm" class="form" [formGroup]="form" (ngSubmit)="onSubmit(f)">
    <es-dropzone
      chooseText="CHOOSE FILES"
      dragText="or drag files in this area (max size: 50 MB)"
      formControlName="docs"
    >
      <mat-hint>This is an example of a hint message</mat-hint>
      <mat-error>Select at least one file</mat-error>
    </es-dropzone>
    <button class="form__submit" color="primary" mat-raised-button type="submit">Submit</button>
  </form>
  `,
  scss: `
  .form {
    max-width: 400px;

    &__submit {
      margin-top: 15px;
      text-transform: uppercase;
    }
  }
  `
};
