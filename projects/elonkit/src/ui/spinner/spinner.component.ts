import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Inject, InjectionToken, Input, Optional, ViewEncapsulation } from '@angular/core';

import { ESSpinnerDefaultOptions, ESSpinnerEaseType, ESSpinnerVariant } from '.';

export const ES_SPINNER_DEFAULT_OPTIONS = new InjectionToken<ESSpinnerDefaultOptions>('ES_SPINNER_DEFAULT_OPTIONS');
@Component({
  selector: 'es-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('rotateRing', [
      transition('* => *', [
        style({ transform: 'rotate(0deg)' }),
        animate('{{ duration }}ms {{ ease }}', style({ transform: 'rotate(360deg)' })),
      ]),
    ]),
    trigger('dash', [
      transition('* => *', [
        animate(
          '{{ duration }}ms {{ ease }}',
          keyframes([
            style({
              'stroke-dasharray': '1px, 200px',
              'stroke-dashoffset': '0',
              transform: 'rotate(0deg)',
            }),
            style({
              'stroke-dasharray': '100px, 200px',
              'stroke-dashoffset': '-15px',
              transform: 'rotate(180deg)',
            }),
            style({
              'stroke-dasharray': '100px, 200px',
              'stroke-dashoffset': '-110px',
              transform: 'rotate(360deg)',
            }),
          ])
        ),
      ]),
    ]),
    trigger('step', [
      transition('* => *', [
        animate(
          '{{ duration }}ms {{ ease }}',
          keyframes([
            style({
              transform: 'rotateZ(0deg)',
              offset: 0.125,
            }),
            style({
              transform: 'rotateZ(45deg)',
              offset: 0.25,
            }),
            style({
              transform: 'rotateZ(90deg)',
              offset: 0.375,
            }),
            style({
              transform: 'rotateZ(135deg)',
              offset: 0.5,
            }),
            style({
              transform: 'rotateZ(180deg)',
              offset: 0.625,
            }),
            style({
              transform: 'rotateZ(225deg)',
              offset: 0.75,
            }),
            style({
              transform: 'rotateZ(270deg)',
              offset: 0.875,
            }),
            style({
              transform: 'rotateZ(315deg)',
              offset: 1,
            }),
          ])
        ),
      ]),
    ]),
  ],
})
export class ESSpinnerComponent {
  /**
   * Variant of spinner. Ring as default.
   */
  @Input()
  public get variant(): ESSpinnerVariant {
    return this._variant;
  }
  public set variant(value: ESSpinnerVariant) {
    this._variant = value || this.defaultOptions.variant || 'ring';
  }

  private _variant = 'ring' as ESSpinnerVariant;
  /**
   * Width and height in px.
   */
  @Input()
  public get size(): number {
    return this._size;
  }
  public set size(value: number) {
    this._size = value || this.defaultOptions.size || 40;
  }

  private _size = 40;
  /**
   * Color as string.
   */
  @Input()
  public get color(): string {
    return this._color;
  }
  public set color(value: string) {
    if (!value) return;
    const paletteColors = ['primary', 'accent', 'warn', 'info', 'positive', 'attention', 'mono'];
    if (paletteColors.some((color) => color === value)) {
      this.paletteColor = value;
    } else {
      this.paletteColor = null;
      this._color = value || this.defaultOptions.color || 'currentColor';
    }
  }

  private _color = 'currentColor';

  public paletteColor: string | null = null;
  /**
   * Animation duration in ms.
   */
  @Input()
  public get duration(): number {
    return this._duration;
  }
  public set duration(value: number) {
    this._duration = value || this.defaultOptions.duration || 1000;
  }

  private _duration = 1000;

  /**
   * Set transition ease type.
   */
  @Input()
  public get ease(): ESSpinnerEaseType {
    return this._ease;
  }
  public set ease(value: ESSpinnerEaseType) {
    this._ease = value || this.defaultOptions.ease || 'linear';
  }

  private _ease = 'linear' as ESSpinnerEaseType;

  public ringState = false;
  public fadingRingState = false;
  public fadingDoubleRingState = false;
  public dashState = false;
  public fadingDotsState = false;
  public fadingBarsState = false;

  constructor(
    @Optional()
    @Inject(ES_SPINNER_DEFAULT_OPTIONS)
    private defaultOptions: ESSpinnerDefaultOptions
  ) {}
}
