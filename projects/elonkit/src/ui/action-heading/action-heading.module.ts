import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ESHeadingActionsComponent } from './heading-actions/heading-actions.component';
import { ESHeadingBreadcrumbsComponent } from './heading-breadcrumbs/heading-breadcrumbs.component';
import { ESHeadingHeaderComponent } from './heading-header/heading-header.component';
import { ESHeadingMainComponent } from './heading-main/heading-main.component';
import { ESHeadingStatusComponent } from './heading-status/heading-status.component';
import { ESActionHeadingComponent } from './action-heading.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ESActionHeadingComponent,
    ESHeadingBreadcrumbsComponent,
    ESHeadingMainComponent,
    ESHeadingHeaderComponent,
    ESHeadingActionsComponent,
    ESHeadingStatusComponent,
  ],
  exports: [
    ESActionHeadingComponent,
    ESHeadingBreadcrumbsComponent,
    ESHeadingMainComponent,
    ESHeadingHeaderComponent,
    ESHeadingActionsComponent,
    ESHeadingStatusComponent,
  ],
})
export class ESActionHeadingModule {}
