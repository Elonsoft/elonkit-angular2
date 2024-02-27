import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule, MatIconRegistry } from '@angular/material/icon';

import { ESEmptyStateComponent } from './empty-state.component';
import { CoreModule } from '~storybook/core.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ESEmptyStateComponent],
  imports: [CommonModule, MatIconModule, CoreModule, HttpClientModule],
  exports: [ESEmptyStateComponent],
  providers: [MatIconRegistry],
})
export class ESEmptyStateModule {}
