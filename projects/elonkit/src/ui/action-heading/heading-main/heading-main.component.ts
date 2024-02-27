import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';


@Component({
  selector: 'es-heading-main',
  templateUrl: './heading-main.component.html',
  styleUrls: ['./heading-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ESHeadingMainComponent {
}
