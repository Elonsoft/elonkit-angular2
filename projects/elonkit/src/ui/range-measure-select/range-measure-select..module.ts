import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { OverlayModule } from '@angular/cdk/overlay';

import { RangeMeasureSelectComponent } from './range-measure-select.component';

@NgModule({
  declarations: [RangeMeasureSelectComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatListModule, OverlayModule],
  exports: [RangeMeasureSelectComponent],
})
export class RangeMeasureSelectModule {}
