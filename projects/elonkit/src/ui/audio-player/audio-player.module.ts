import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSliderModule } from '@angular/material/slider';

import { ESAudioPlayerOptionsComponent } from './components/audio-player-options';
import { ESAudioPlayerTimeSliderComponent } from './components/audio-player-time-slider';
import { ESAudioPlayerVolumeComponent } from './components/audio-player-volume';
import { ESAudioPlayerComponent } from './audio-player.component';

import { ESTooltipModule } from '../tooltip';

@NgModule({
  declarations: [
    ESAudioPlayerComponent,
    ESAudioPlayerOptionsComponent,
    ESAudioPlayerTimeSliderComponent,
    ESAudioPlayerVolumeComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSliderModule,
    FormsModule,
    MatMenuModule,
    MatListModule,
    ESTooltipModule,
  ],
  exports: [ESAudioPlayerComponent],
})
export class ESAudioPlayerModule {}
