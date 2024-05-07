import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'es-error-page-description',
  templateUrl: './error-page-description.component.html',
  styleUrls: ['./error-page-description.component.scss'],
})
export class ESErrorPageDescriptionComponent {
  @HostBinding('class') class = 'es-error-page-description';
}
