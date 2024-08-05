import { NgModule } from '@angular/core';

import { MatIconRegistry } from '@angular/material/icon';

import {
  ESErrorPageActionsComponent,
  ESErrorPageComponent,
  ESErrorPageDescriptionComponent,
  ESErrorPageFooterComponent,
  ESErrorPageHeadingComponent,
  ESErrorPageLogoComponent,
  ESErrorPageStatusComponent,
} from '.';

@NgModule({
  imports: [],
  exports: [
    ESErrorPageComponent,
    ESErrorPageLogoComponent,
    ESErrorPageStatusComponent,
    ESErrorPageHeadingComponent,
    ESErrorPageDescriptionComponent,
    ESErrorPageActionsComponent,
    ESErrorPageFooterComponent,
  ],
  declarations: [
    ESErrorPageComponent,
    ESErrorPageLogoComponent,
    ESErrorPageStatusComponent,
    ESErrorPageHeadingComponent,
    ESErrorPageDescriptionComponent,
    ESErrorPageActionsComponent,
    ESErrorPageFooterComponent,
  ],
  providers: [MatIconRegistry],
})
export class ESErrorPageModule {}
