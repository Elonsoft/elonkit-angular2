import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ESSidebarComponent } from './sidebar.component';
import { ESSidebarDividerComponent } from './sidebar-divider/sidebar-divider.component';
import { ESSidebarItemComponent } from './sidebar-item/sidebar-item.component';
import { ESSidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { ESSidebarScrollableComponent } from './sidebar-scrollable/sidebar-scrollable.component';
import { ESSidebarSpacerComponent } from './sidebar-spacer/sidebar-spacer.component';
import { ESSidebarToggleComponent } from './sidebar-toggle/sidebar-toggle.component';
import { ESTooltipModule } from '../tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [
    ESSidebarComponent,
    ESSidebarDividerComponent,
    ESSidebarItemComponent,
    ESSidebarMenuComponent,
    ESSidebarScrollableComponent,
    ESSidebarSpacerComponent,
    ESSidebarToggleComponent,
  ],
  imports: [CommonModule, ESTooltipModule, MatButtonModule, MatIconModule, MatDividerModule, MatRippleModule],
  exports: [
    ESSidebarComponent,
    ESSidebarDividerComponent,
    ESSidebarItemComponent,
    ESSidebarMenuComponent,
    ESSidebarScrollableComponent,
    ESSidebarSpacerComponent,
    ESSidebarToggleComponent,
  ],
  providers: [MatIconRegistry],
})
export class ESSidebarModule {}
