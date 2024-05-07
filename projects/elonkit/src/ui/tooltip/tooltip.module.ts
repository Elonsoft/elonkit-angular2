import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatCommonModule } from '@angular/material/core';
import { MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER } from '@angular/material/tooltip';

import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkScrollableModule } from '@angular/cdk/scrolling';

import { ESTooltipComponent } from './tooltip.component';
import { ESTooltipDirective } from './tooltip.directive';

@NgModule({
  imports: [CommonModule, A11yModule, OverlayModule, MatCommonModule],
  exports: [ESTooltipDirective, ESTooltipComponent, CdkScrollableModule, MatCommonModule],
  declarations: [ESTooltipDirective, ESTooltipComponent],
  providers: [MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER],
})
export class ESTooltipModule {}
