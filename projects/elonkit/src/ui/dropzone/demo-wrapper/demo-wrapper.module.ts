import { NgModule } from '@angular/core';
import { DemoWrapperComponent } from './demo-wrapper.component';
import { CommonModule } from '@angular/common';
import { ESDropzoneModule } from '..';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  imports: [CommonModule, ESDropzoneModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule],
  exports: [DemoWrapperComponent],
  declarations: [DemoWrapperComponent],
})
export class DemoWrapperModule {}
