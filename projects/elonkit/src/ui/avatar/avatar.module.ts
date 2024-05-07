import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';

import { ESAvatarComponent } from './avatar.component';
import { ESAvatarGroupComponent } from './avatar-group.component';

@NgModule({
  declarations: [ESAvatarComponent, ESAvatarGroupComponent],
  imports: [CommonModule, MatIconModule],
  exports: [ESAvatarComponent, ESAvatarGroupComponent],
})
export class ESAvatarModule {}
