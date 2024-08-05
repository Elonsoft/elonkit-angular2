import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { DemoWrapperComponent } from './demo-wrapper.component';

import { ESDropzoneModule } from '..';

@NgModule({
  imports: [CommonModule, ESDropzoneModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule],
  exports: [DemoWrapperComponent],
  declarations: [DemoWrapperComponent],
})
export class DemoWrapperModule {}
