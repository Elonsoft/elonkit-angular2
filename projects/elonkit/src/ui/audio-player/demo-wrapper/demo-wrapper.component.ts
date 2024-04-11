import { Component, Input, ViewChild } from '@angular/core';
import { ESAudioPlayerComponent } from '../audio-player.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-wrapper',
  template: `
    <h3 class="es-h3">Default</h3>
    <div class="audio-player" style="padding: 10px 20px;">
      <es-audio-player [source]="source" [volume]="volume"></es-audio-player>
    </div>

    <h3 class="es-h3">Imperative Actions</h3>

    <div class="imperative">
      <div class="audio-player" style="padding: 10px 20px;">
        <es-audio-player #player1 [source]="source" [volume]="volume" (audioPlay)="onPlay($event, 'player1')"></es-audio-player>
      </div>

      <div class="audio-player" style="padding: 10px 20px;">
        <es-audio-player #player2 [source]="source" [volume]="volume" (audioPlay)="onPlay($event, 'player2')"></es-audio-player>
      </div>
    </div>
  `,
})
export class DemoWrapperComponent {
  @Input() public volume!: number;
  @Input() public source!: string;

  @ViewChild('player1') private player1!: ESAudioPlayerComponent;
  @ViewChild('player2') private player2!: ESAudioPlayerComponent;

  constructor() {}

  public onPlay(event: Event, tag: string): void {
    if (event && tag === 'player1') {
      this.player2.audio.pause();
    }

    if (event && tag === 'player2') {
      this.player1.audio.pause();
    }
  }
}
