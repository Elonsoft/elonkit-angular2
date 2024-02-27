import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
} from '@angular/core';


@Component({
  selector: 'es-heading-header',
  templateUrl: './heading-header.component.html',
  styleUrls: ['./heading-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ESHeadingHeaderComponent {
  @Input()
  public maxLines = 1;
}
