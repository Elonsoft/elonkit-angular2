import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ESSidebarComponent } from './sidebar.component';
import { ESSidebarDividerComponent } from './sidebar-divider/sidebar-divider.component';
import { ESSidebarItemComponent } from './sidebar-item/sidebar-item.component';
import { ESSidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { ESSidebarScrollableComponent } from './sidebar-scrollable/sidebar-scrollable.component';
import { ESSidebarSpacerComponent } from './sidebar-spacer/sidebar-spacer.component';
import { ESSidebarToggleComponent } from './sidebar-toggle/sidebar-toggle.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ESTooltipModule } from '../tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { CoreModule } from '~storybook/core.module';
import { HttpClientModule } from '@angular/common/http';
import { MatDividerModule } from '@angular/material/divider';

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
  imports: [CommonModule, ESTooltipModule, MatButtonModule, MatIconModule, MatDividerModule],
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
