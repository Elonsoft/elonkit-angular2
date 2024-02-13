import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'es-timepicker-required',
  templateUrl: './timepicker-story-required.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimepickerStoryRequiredComponent {
  @Input() public required: boolean;

  public date = new Date(0);
}
