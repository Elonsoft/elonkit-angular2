import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'es-timepicker-basic',
  templateUrl: './timepicker-story-basic.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimepickerStoryBasicComponent {
  public date = new Date(0);
}
