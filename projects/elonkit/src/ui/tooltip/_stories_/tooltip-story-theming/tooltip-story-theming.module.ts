import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';

import { TooltipStoryThemingComponent } from './tooltip-story-theming.component';

import { ESTooltipModule } from '../..';

@NgModule({
  declarations: [TooltipStoryThemingComponent],
  imports: [CommonModule, MatButtonModule, ESTooltipModule],
  exports: [TooltipStoryThemingComponent],
})
export class TooltipStoryThemingModule {}
