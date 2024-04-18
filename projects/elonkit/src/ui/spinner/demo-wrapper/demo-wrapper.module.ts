import { NgModule } from '@angular/core';
import { DemoWrapperComponent } from './demo-wrapper.component';
import { CommonModule } from '@angular/common';
import { ESSpinnerModule } from '..';

@NgModule({
  imports: [CommonModule, ESSpinnerModule],
  exports: [DemoWrapperComponent],
  declarations: [DemoWrapperComponent],
})
export class DemoWrapperModule {}
