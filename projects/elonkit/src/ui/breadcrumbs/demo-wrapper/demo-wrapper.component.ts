/* eslint-disable @angular-eslint/component-selector */
import { Component, Input } from '@angular/core';
import { ESBreadcrumb } from '..';

@Component({
  selector: 'demo-wrapper',
  template: `
    <div style="padding: 16px;">
      <es-breadcrumbs [breadcrumbs]="breadcrumbs"></es-breadcrumbs>
    </div>
  `,
})
export class DemoWrapperComponent {
  @Input() public breadcrumbs: ESBreadcrumb[];
  constructor() {}
}
