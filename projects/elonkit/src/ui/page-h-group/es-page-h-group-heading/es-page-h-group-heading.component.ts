import { ChangeDetectionStrategy, Component, Inject, InjectionToken, Input, Optional, ViewEncapsulation } from '@angular/core';

export interface ESHeaderDefaultOptions {
  typography?: string;
  maxLines?: number;
}

const DEFAULT_MAX_LINES = 1;
const DEFAULT_TYPOGRAPHY = 'es-h2';

export const ES_HEADER_DEFAULT_OPTIONS = new InjectionToken<ESHeaderDefaultOptions>('ES_HEADER_DEFAULT_OPTIONS');
@Component({
  selector: 'es-page-h-group-heading',
  templateUrl: './es-page-h-group-heading.component.html',
  styleUrls: ['./es-page-h-group-heading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ESPageHGroupHeadingComponent {
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
