import { NgModule } from '@angular/core';
import { DemoWrapperComponent } from './demo-wrapper.component';
import { ESSortingComponent } from '../sorting.component';
import { CommonModule } from '@angular/common';
import { MatIconRegistry } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '~storybook/core.module';

@NgModule({
  imports: [CommonModule, ESSortingComponent, HttpClientModule, CoreModule],
  exports: [DemoWrapperComponent],
  declarations: [DemoWrapperComponent],
  providers: [MatIconRegistry],
})
export class DemoWrapperModule {}
