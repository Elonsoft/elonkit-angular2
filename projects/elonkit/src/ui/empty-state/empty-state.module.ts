import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatIconModule, MatIconRegistry } from '@angular/material/icon';

import { ESEmptyStateComponent } from './empty-state.component';

@NgModule({
  declarations: [ESEmptyStateComponent],
  imports: [CommonModule, MatIconModule],
  exports: [ESEmptyStateComponent],
  providers: [MatIconRegistry],
})
export class ESEmptyStateModule {}
