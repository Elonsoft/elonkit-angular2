import { NgModule } from '@angular/core';
import { DemoWrapperComponent } from './demo-wrapper.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ESPasswordFieldComponent } from '../pasword-field.component';

@NgModule({
  imports: [CommonModule, ESPasswordFieldComponent, MatFormFieldModule, ReactiveFormsModule],
  exports: [DemoWrapperComponent],
  declarations: [DemoWrapperComponent],
  providers: [],
})
export class DemoWrapperModule {}
