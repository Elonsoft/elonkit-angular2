import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';

import { ESBreadcrumbsComponent } from './breadcrumbs.component';

import { ESBreadcrumbsBreadcrumbComponent } from './components/breadcrumbs-breadcrumb';
import { ESBreadcrumbsCollapseComponent } from './components/breadcrumbs-collapse';

import { ESBreadcrumbsMoreDirective } from './directives/breadcrumbs-more.directive';
import { ESBreadcrumbsSeparatorDirective } from './directives/breadcrumbs-separator.directive';

@NgModule({
  declarations: [
    ESBreadcrumbsComponent,

    ESBreadcrumbsBreadcrumbComponent,
    ESBreadcrumbsCollapseComponent,

    ESBreadcrumbsMoreDirective,
    ESBreadcrumbsSeparatorDirective,
  ],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule, MatRippleModule],
  exports: [ESBreadcrumbsComponent, ESBreadcrumbsMoreDirective, ESBreadcrumbsSeparatorDirective],
  providers: [],
})
export class ESBreadcrumbsModule {}
