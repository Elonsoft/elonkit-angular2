import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatInputModule } from '@angular/material/input';

import { ESTimepickerComponent } from './timepicker.component';

import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  declarations: [ESTimepickerComponent],
  imports: [CommonModule, MatInputModule],
  exports: [ESTimepickerComponent],
  providers: [DatePipe],
})
export class ESTimepickerModule {}
