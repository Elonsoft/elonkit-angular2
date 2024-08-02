import { NgModule } from '@angular/core';

import { ESBannerComponent } from './banner.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [ESBannerComponent],
  declarations: [ESBannerComponent],
  providers: [MatIconRegistry],
})
export class ESBannerModule { }
