import { NgModule } from '@angular/core';
import { DemoWrapperComponent } from './demo-wrapper.component';
import { CommonModule } from '@angular/common';
import { ESSwitchComponent } from '../switch.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ESSwitchComponent, ReactiveFormsModule],
  exports: [DemoWrapperComponent],
  declarations: [DemoWrapperComponent],
  providers: [],
})
export class DemoWrapperModule {}
