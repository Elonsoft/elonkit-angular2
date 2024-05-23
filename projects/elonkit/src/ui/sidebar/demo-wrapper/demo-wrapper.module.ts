import { NgModule } from '@angular/core';
import { DemoWrapperComponent } from './demo-wrapper.component';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ESSidebarModule } from '..';

@NgModule({
  imports: [CommonModule, MatIconModule, MatTooltipModule, ESSidebarModule],
  exports: [DemoWrapperComponent],
  declarations: [DemoWrapperComponent],
  providers: [MatIconRegistry],
})
export class DemoWrapperModule {}
