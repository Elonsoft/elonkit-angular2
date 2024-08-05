import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';

import { DemoWrapperComponent } from './demo-wrapper.component';

import { CoreModule } from '~storybook/core.module';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatIconModule, HttpClientModule, CoreModule],
  exports: [DemoWrapperComponent],
  declarations: [DemoWrapperComponent],
  providers: [MatIconRegistry],
})
export class DemoWrapperModule {}
