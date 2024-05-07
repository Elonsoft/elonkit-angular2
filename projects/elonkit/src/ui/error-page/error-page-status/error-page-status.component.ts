import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'es-error-page-status',
  templateUrl: './error-page-status.component.html',
  styleUrls: ['./error-page-status.component.scss'],
})
export class ESErrorPageStatusComponent {
  @HostBinding('class') class = 'es-error-page-status';
}
