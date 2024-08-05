import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { DialogActionsComponent } from './dialog-actions/dialog-actions.component';
import { DialogContentComponent } from './dialog-content/dialog-content.component';
import { DialogTitleComponent } from './dialog-title/dialog-title.component';
import { DialogComponent } from './dialog.component';

@NgModule({
  declarations: [DialogComponent, DialogTitleComponent, DialogContentComponent, DialogActionsComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [DialogComponent, DialogTitleComponent, DialogContentComponent, DialogActionsComponent],
})
export class DialogModule {}
