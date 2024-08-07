import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';

import { TooltipStoryListenersComponent } from './tooltip-story-listeners.component';

import { ESTooltipModule } from '../..';

@NgModule({
  declarations: [TooltipStoryListenersComponent],
  imports: [CommonModule, MatButtonModule, ESTooltipModule],
  exports: [TooltipStoryListenersComponent],
})
export class TooltipStoryListenersModule {}
