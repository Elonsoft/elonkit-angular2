import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'es-action-heading',
  templateUrl: './action-heading.component.html',
  styleUrls: ['./action-heading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ESActionHeadingComponent {}
