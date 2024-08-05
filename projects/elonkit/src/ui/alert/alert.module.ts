import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ESAlertActionsComponent } from './components/alert-actions';
import { ESAlertComponent } from './alert.component';

@NgModule({
  declarations: [ESAlertComponent, ESAlertActionsComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [ESAlertComponent, ESAlertActionsComponent, MatButtonModule],
})
export class ESAlertModule {}
