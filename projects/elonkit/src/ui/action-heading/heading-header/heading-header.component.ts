import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, InjectionToken, Optional, Inject } from '@angular/core';

export interface ESHeaderDefaultOptions {
  typography?: string;
  maxLines?: number;
}

const DEFAULT_MAX_LINES = 1;
const DEFAULT_TYPOGRAPHY = 'es-h2';

export const ES_HEADER_DEFAULT_OPTIONS = new InjectionToken<ESHeaderDefaultOptions>('ES_HEADER_DEFAULT_OPTIONS');
@Component({
  selector: 'es-heading-header',
  templateUrl: './heading-header.component.html',
  styleUrls: ['./heading-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ESHeadingHeaderComponent {
  private _maxLines: number;

  /**
   * Set max lines in header.
   */
  @Input()
  public get maxLines(): number {
    return this._maxLines;
  }
  public set maxLines(value: number) {
    this._maxLines = value || (this.defaultOptions && this.defaultOptions.maxLines) || DEFAULT_MAX_LINES;
  }

  private _typography: string;

  /**
   * Class applied to text.
   */
  @Input()
  public get typography(): string {
    return this._typography;
  }
  public set typography(value: string) {
    this._typography = value || (this.defaultOptions && this.defaultOptions.typography) || DEFAULT_TYPOGRAPHY;
  }

  constructor(
    /**
     * @internal
     */
    @Optional()
    @Inject(ES_HEADER_DEFAULT_OPTIONS)
    private defaultOptions: ESHeaderDefaultOptions
  ) {
    this.typography = (defaultOptions && defaultOptions.typography) || DEFAULT_TYPOGRAPHY;

    this.maxLines = (defaultOptions && defaultOptions.maxLines) || DEFAULT_MAX_LINES;
  }
}
