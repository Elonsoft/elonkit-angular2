import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayComponent } from './overlay.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [OverlayComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [OverlayComponent],
})
export class OverlayModule {}
