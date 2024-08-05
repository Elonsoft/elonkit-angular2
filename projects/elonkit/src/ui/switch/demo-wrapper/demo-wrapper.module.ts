import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { DemoWrapperComponent } from './demo-wrapper.component';

import { ESSwitchComponent } from '../switch.component';

@NgModule({
  imports: [CommonModule, ESSwitchComponent, ReactiveFormsModule],
  exports: [DemoWrapperComponent],
  declarations: [DemoWrapperComponent],
  providers: [],
})
export class DemoWrapperModule {}
