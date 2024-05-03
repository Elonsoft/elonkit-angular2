import { NgModule } from '@angular/core';

import {
  ESErrorPageComponent,
  ESErrorPageLogoComponent,
  ESErrorPageStatusComponent,
  ESErrorPageHeadingComponent,
  ESErrorPageDescriptionComponent,
  ESErrorPageActionsComponent,
  ESErrorPageFooterComponent,
} from '.';
import { MatIconRegistry } from '@angular/material/icon';

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
