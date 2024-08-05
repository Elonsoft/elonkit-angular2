import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KbdComponent } from './kbd.component';

@NgModule({
  declarations: [KbdComponent],
  imports: [CommonModule],
  exports: [KbdComponent],
})
export class KbdModule {}
