import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MadeByComponent } from './made-by.component';

@NgModule({
  declarations: [MadeByComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [MadeByComponent],
})
export class MadeByModule {}
