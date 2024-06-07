import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MadeByComponent } from './made-by.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [MadeByComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [MadeByComponent],
})
export class MadeByModule {}
