import { NgModule } from '@angular/core';
import { DemoWrapperComponent } from './demo-wrapper.component';
import { CommonModule } from '@angular/common';
import { ESSidebarModule } from '../../sidebar';

@NgModule({
  imports: [CommonModule, ESSidebarModule],
  exports: [DemoWrapperComponent],
  declarations: [DemoWrapperComponent],
})
export class DemoWrapperModule {}
