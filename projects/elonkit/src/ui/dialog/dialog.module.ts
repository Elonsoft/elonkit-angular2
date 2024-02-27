import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog.component';
import { DialogTitleComponent } from './dialog-title/dialog-title.component';
import { DialogContentComponent } from './dialog-content/dialog-content.component';
import { DialogActionsComponent } from './dialog-actions/dialog-actions.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [DialogComponent, DialogTitleComponent, DialogContentComponent, DialogActionsComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [DialogComponent, DialogTitleComponent, DialogContentComponent, DialogActionsComponent],
})
export class DialogModule {}
