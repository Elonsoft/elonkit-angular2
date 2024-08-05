import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';

import { DemoWrapperComponent } from './demo-wrapper.component';

import { ESAutocompleteFieldModule } from '../autocomplete-field.module';

@NgModule({
  imports: [CommonModule, ESAutocompleteFieldModule, MatFormFieldModule, ReactiveFormsModule],
  exports: [DemoWrapperComponent],
  declarations: [DemoWrapperComponent],
  providers: [],
})
export class DemoWrapperModule {}
