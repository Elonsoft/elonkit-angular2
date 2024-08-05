import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ESEmptyStateCompactComponent } from './empty-state-compact.component';

@NgModule({
  declarations: [ESEmptyStateCompactComponent],
  imports: [CommonModule],
  exports: [ESEmptyStateCompactComponent],
})
export class ESEmptyStateCompactModule {}
