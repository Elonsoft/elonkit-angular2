import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconRegistry } from '@angular/material/icon';

import { DemoWrapperComponent } from './demo-wrapper.component';

import { ESSFSComponent } from '../sfs.component';

import { CoreModule } from '~storybook/core.module';

@NgModule({
  imports: [CommonModule, ESSFSComponent, HttpClientModule, CoreModule, ReactiveFormsModule, MatFormFieldModule],
  exports: [DemoWrapperComponent],
  declarations: [DemoWrapperComponent],
  providers: [MatIconRegistry],
})
export class DemoWrapperModule {}
