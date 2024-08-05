import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { DemoWrapperComponent } from './demo-wrapper.component';

import { ESFlagComponent } from '../flag.component';

@NgModule({
  imports: [CommonModule, MatIconModule, MatTooltipModule, ESFlagComponent],
  exports: [DemoWrapperComponent],
  declarations: [DemoWrapperComponent],
  providers: [MatIconRegistry],
})
export class DemoWrapperModule {}
