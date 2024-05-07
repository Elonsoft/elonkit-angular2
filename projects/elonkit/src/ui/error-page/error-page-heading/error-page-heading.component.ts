import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'es-error-page-heading',
  templateUrl: './error-page-heading.component.html',
  styleUrls: ['./error-page-heading.component.scss'],
})
export class ESErrorPageHeadingComponent {
  @HostBinding('class') class = 'es-error-page-heading';
}
