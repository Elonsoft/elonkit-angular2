import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ESActionHeadingComponent } from './action-heading.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ESHeadingActionsComponent } from './heading-actions/heading-actions.component';
import { ESHeadingMainComponent } from './heading-main/heading-main.component';
import { ESHeadingHeaderComponent } from './heading-header/heading-header.component';
import { ESHeadingStatusComponent } from './heading-status/heading-status.component';
import { ESHeadingBreadcrumbsComponent } from './heading-breadcrumbs/heading-breadcrumbs.component';

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
