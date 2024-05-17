import { Component, Input } from '@angular/core';
import { ESSpinnerEaseType, ESSpinnerVariant } from '..';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-wrapper',
  template: `
    <div [ngStyle]="{ color: color ? '' : genColor }">
      <es-spinner [variant]="variant" [size]="size" [color]="color" [duration]="duration" [ease]="ease"></es-spinner>
    </div>
  `,
})
export class DemoWrapperComponent {
  @Input() variant!: ESSpinnerVariant;
  @Input() size!: number;
  @Input() color!: string;
  @Input() duration!: number;
  @Input() ease!: ESSpinnerEaseType;
  constructor() {}

  public genColor = this.getRandomHexColor();

  private getRandomHexColor(): string {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    console.log('color:', randomColor);
    return '#' + ('000000' + randomColor).slice(-6);
  }
}
