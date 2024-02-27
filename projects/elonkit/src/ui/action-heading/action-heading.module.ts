import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ESActionHeadingComponent } from './action-heading.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ESHeadingActionsComponent } from './heading-actions/heading-actions.component';
import { ESHeadingMainComponent } from './heading-main/heading-main.component';
import { ESHeadingHeaderComponent } from './heading-header/heading-header.component';
import { ESHeadingStatusComponent } from './heading-status/heading-status.component';

@NgModule({
  imports: [CommonModule, MatIconModule, MatButtonModule],
  declarations: [ESActionHeadingComponent, ESHeadingMainComponent, ESHeadingHeaderComponent, ESHeadingActionsComponent, ESHeadingStatusComponent],
  exports: [ESActionHeadingComponent]
})
export class ESActionHeadingModule {}
