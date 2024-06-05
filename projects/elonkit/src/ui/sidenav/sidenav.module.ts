import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ESSidenavComponent } from './sidenav.component';
import { ESSidenavItemComponent } from './sidenav-item/sidenav-item.component';

@NgModule({
  declarations: [ESSidenavComponent, ESSidenavItemComponent],
  imports: [CommonModule],
})
export class ESSidenavModule {}
