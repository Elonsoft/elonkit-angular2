import { NgModule } from '@angular/core';
import { DemoWrapperComponent } from './demo-wrapper.component';
import { ESSFSComponent } from '../sfs.component';
import { CommonModule } from '@angular/common';
import { MatIconRegistry } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '~storybook/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  imports: [CommonModule, ESSFSComponent, HttpClientModule, CoreModule, ReactiveFormsModule, MatFormFieldModule],
  exports: [DemoWrapperComponent],
  declarations: [DemoWrapperComponent],
  providers: [MatIconRegistry],
})
export class DemoWrapperModule {}
