import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ESPageHGroupActionsComponent } from './es-page-h-group-actions/es-page-h-group-actions.component';
import { ESPageHGroupBreadcrumbsComponent } from './es-page-h-group-breadcrumbs/es-page-h-group-breadcrumbs.component';
import { ESPageHGroupHeadingComponent } from './es-page-h-group-heading/es-page-h-group-heading.component';
import { ESPageHGroupMainComponent } from './es-page-h-group-main/es-page-h-group-main.component';
import { ESPageHGroupStatusComponent } from './es-page-h-group-status/es-page-h-group-status.component';
import { ESPageHGroupComponent } from './es-page-h-group.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ESPageHGroupComponent,
    ESPageHGroupBreadcrumbsComponent,
    ESPageHGroupMainComponent,
    ESPageHGroupHeadingComponent,
    ESPageHGroupActionsComponent,
    ESPageHGroupStatusComponent,
  ],
  exports: [
    ESPageHGroupComponent,
    ESPageHGroupBreadcrumbsComponent,
    ESPageHGroupMainComponent,
    ESPageHGroupHeadingComponent,
    ESPageHGroupActionsComponent,
    ESPageHGroupStatusComponent,
  ],
})
export class ESPageHGroupModule {}
