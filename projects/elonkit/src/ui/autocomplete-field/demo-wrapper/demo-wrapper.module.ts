import { NgModule } from '@angular/core';
import { DemoWrapperComponent } from './demo-wrapper.component';
import { ESAutocompleteFieldModule } from '../autocomplete-field.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, ESAutocompleteFieldModule, MatFormFieldModule, ReactiveFormsModule],
  exports: [DemoWrapperComponent],
  declarations: [DemoWrapperComponent],
  providers: [],
})
export class DemoWrapperModule {}
