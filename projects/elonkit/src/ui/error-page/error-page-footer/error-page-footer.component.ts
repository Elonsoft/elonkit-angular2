import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'es-error-page-footer',
  templateUrl: './error-page-footer.component.html',
  styleUrls: ['./error-page-footer.component.scss'],
})
export class ESErrorPageFooterComponent {
  @HostBinding('class') class = 'es-error-page-footer';
}
