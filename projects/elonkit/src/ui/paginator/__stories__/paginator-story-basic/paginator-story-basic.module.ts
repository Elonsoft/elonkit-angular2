import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PaginatorStoryBasicComponent } from './paginator-story-basic.component';

import { ESPaginatorModule } from '../..';

@NgModule({
  declarations: [PaginatorStoryBasicComponent],
  imports: [CommonModule, ESPaginatorModule],
  exports: [PaginatorStoryBasicComponent],
})
export class PaginatorStoryBasicModule {}
