import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';

import { ESSwiperComponent } from '.';
import { ESSwiperPaginationComponent } from '.';

@NgModule({
  declarations: [ESSwiperComponent, ESSwiperPaginationComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [ESSwiperComponent],
  providers: [MatIconRegistry],
})
export class ESSwiperModule {}
