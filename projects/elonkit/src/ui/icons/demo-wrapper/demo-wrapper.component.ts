import { Component, Input } from '@angular/core';
import { ES_SVG_ICONS } from '../index';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-wrapper',
  template: `
    <div [ngStyle]="{ display: 'flex', gap: '20px', 'flex-direction': 'column' }">
      <ng-container *ngFor="let icons of iconsArr">
        <h4 class="es-h4">Icons {{ icons.key }}</h4>
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
              <mat-icon svgIcon="{{ icons.key }}:{{ icon }}" [ngStyle]="{ color: color }"></mat-icon>
            </div>
          </ng-container>
        </div>
      </ng-container>
    </div>
  `,
})
export class DemoWrapperComponent {
  @Input() public color = '#f2f';

  public iconsArr: Array<{ names: string[]; key: string }> = [
    { names: ES_SVG_ICONS['es-24'], key: 'es-24' },
    { names: ES_SVG_ICONS['es-48'], key: 'es-48' },
    { names: ES_SVG_ICONS['es-other'], key: 'es-other' },
    { names: ES_SVG_ICONS['es-error-page'], key: 'es-error-page' },
  ];

  constructor() {}
}
