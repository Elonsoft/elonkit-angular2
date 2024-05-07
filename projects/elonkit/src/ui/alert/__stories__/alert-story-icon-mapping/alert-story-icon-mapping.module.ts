import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AlertStoryIconMappingComponent } from './alert-story-icon-mapping.component';

import { ES_ALERT_DEFAULT_OPTIONS, ESAlertModule } from '../..';

@NgModule({
  declarations: [AlertStoryIconMappingComponent],
  imports: [CommonModule, HttpClientModule, ESAlertModule],
  exports: [AlertStoryIconMappingComponent],
  providers: [
    {
      provide: ES_ALERT_DEFAULT_OPTIONS,
      useValue: {
        iconMapping: {
          warning: { svgIcon: 'warning' },
          error: { svgIcon: 'error' },
        },
      },
    },
  ],
})
export class AlertStoryIconMappingModule {}
