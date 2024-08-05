import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DemoWrapperComponent } from './demo-wrapper.component';

import { ESSidebarModule } from '../../sidebar';
import { ESSidenavModule } from '..';

@NgModule({
  imports: [CommonModule, ESSidebarModule, ESSidenavModule],
  exports: [DemoWrapperComponent],
  declarations: [DemoWrapperComponent],
})
export class DemoWrapperModule {}
