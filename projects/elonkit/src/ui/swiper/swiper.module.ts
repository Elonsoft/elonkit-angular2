import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ESSwiperComponent } from '.';
import { ESSwiperPaginationComponent } from '.';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ESSwiperComponent, ESSwiperPaginationComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [ESSwiperComponent],
  providers: [MatIconRegistry],
})
export class ESSwiperModule {}
