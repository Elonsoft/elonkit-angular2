import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

import { ESSidenavItemComponent } from './sidenav-item/sidenav-item.component';
import { ESSidenavComponent } from './sidenav.component';
import { ESSidenavService } from './sidenav.service';

import { ESTooltipModule } from '../tooltip';

@NgModule({
  declarations: [ESSidenavComponent, ESSidenavItemComponent],
  imports: [CommonModule, MatIconModule, MatRippleModule, ESTooltipModule],
  exports: [ESSidenavComponent, ESSidenavItemComponent],
  providers: [ESSidenavService],
})
export class ESSidenavModule {}
