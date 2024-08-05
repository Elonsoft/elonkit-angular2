import { Component, Input } from '@angular/core';

import { ES_SVG_ICONS } from '../../icons';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-wrapper',
  template: `
    <div [ngStyle]="{ display: 'flex', gap: '20px', 'flex-direction': 'column' }">
      <ng-container *ngFor="let icons of iconsArr">
        <h4 class="es-h4">Icons {{ icons.key }}</h4>
        <code> &lt;es-flag [flag]="FLAG_NAME"&gt;&lt;/es-flag&gt; </code>
        <div [ngStyle]="{ display: 'flex', gap: '10px', 'flex-direction': 'row', 'flex-wrap': 'wrap' }">
          <ng-container *ngFor="let icon of icons.names">
            <div
              matTooltip="{{ icon }}"
              matTooltipShowDelay="200"
              matTooltipClass="es-body-100"
              [ngStyle]="{
                display: 'flex',
                'justify-content': 'center',
                'align-items': 'center',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                height: '40px',
                width: '40px'
              }">
              <es-flag [flag]="icon"></es-flag>
            </div>
          </ng-container>
        </div>
      </ng-container>
    </div>
  `,
})
export class DemoWrapperComponent {
  @Input() public color = '#f2f';

  public iconsArr: Array<{ names: string[]; key: string }> = [{ names: ES_SVG_ICONS['es-flags'], key: 'es-flags' }];

  constructor() {}
}
