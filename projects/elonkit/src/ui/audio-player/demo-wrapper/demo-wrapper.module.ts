import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { MatIconRegistry } from '@angular/material/icon';

import { DemoWrapperComponent } from './demo-wrapper.component';

import { ESAudioPlayerModule } from '..';

import { CoreModule } from '~storybook/core.module';

@NgModule({
  imports: [ESAudioPlayerModule, CommonModule, HttpClientModule, CoreModule],
  exports: [DemoWrapperComponent],
  declarations: [DemoWrapperComponent],
  providers: [MatIconRegistry],
})
export class DemoWrapperModule {}
