import { NgModule } from '@angular/core';
import { DemoWrapperComponent } from './demo-wrapper.component';
import { CommonModule } from '@angular/common';
import { ESBreadcrumbsModule } from '..';
import { MatIconRegistry } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '~storybook/core.module';

@NgModule({
  imports: [CommonModule, ESBreadcrumbsModule, HttpClientModule, CoreModule],
  exports: [DemoWrapperComponent],
  declarations: [DemoWrapperComponent],
  providers: [MatIconRegistry],
})
export class DemoWrapperModule {}
