import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'es-heading-breadcrumbs',
  templateUrl: './heading-breadcrumbs.component.html',
  styleUrls: ['./heading-breadcrumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ESHeadingBreadcrumbsComponent {}
