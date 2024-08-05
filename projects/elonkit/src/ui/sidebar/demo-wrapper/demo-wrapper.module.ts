import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DemoWrapperComponent } from './demo-wrapper.component';

import { ESSidebarModule } from '..';

@NgModule({
  imports: [CommonModule, ESSidebarModule],
  exports: [DemoWrapperComponent],
  declarations: [DemoWrapperComponent],
})
export class DemoWrapperModule {}
