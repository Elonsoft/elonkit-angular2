export const TIMEPICKER_STORY_SECONDS_SOURCE = {
  ts: `
  @Component({
    ...
  })
  export class FormComponent {
    public date = new Date();
  }
  `,
  html: `
  <mat-form-field appearance="outline">
    <mat-label>Time</mat-label>
    <es-timepicker [(ngModel)]="date" withSeconds></es-timepicker>
  </mat-form-field>
  `
};
