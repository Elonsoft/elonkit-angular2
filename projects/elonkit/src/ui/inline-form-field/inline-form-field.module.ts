import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ESInlineFormFieldComponent } from './inline-form-field.component';

@NgModule({
  declarations: [ESInlineFormFieldComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [ESInlineFormFieldComponent],
})
export class ESInlineFormFieldModule {}
