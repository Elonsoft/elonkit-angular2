import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ESSidenavComponent } from './sidenav.component';
import { ESSidenavItemComponent } from './sidenav-item/sidenav-item.component';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { ESTooltipModule } from '../tooltip';
import { ESSidenavService } from './sidenav.service';

@NgModule({
  declarations: [ESSidenavComponent, ESSidenavItemComponent],
  imports: [CommonModule, MatIconModule, MatRippleModule, ESTooltipModule],
  exports: [ESSidenavComponent, ESSidenavItemComponent],
  providers: [ESSidenavService],
})
export class ESSidenavModule {}
