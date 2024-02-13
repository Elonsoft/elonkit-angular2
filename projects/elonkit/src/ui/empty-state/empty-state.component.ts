import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewEncapsulation,
  Input,
  InjectionToken,
  Optional,
  Inject
} from '@angular/core';

import { ESEmptyStateIcon } from './empty-state.types';

export interface ESEmptyStateDefaultOptions {
  icon?: ESEmptyStateIcon;
  headingTypography?: string;
  subheadingTypography?: string;
}

export const ES_EMPTY_STATE_DEFAULT_OPTIONS = new InjectionToken<ESEmptyStateDefaultOptions>(
  'ES_EMPTY_STATE_DEFAULT_OPTIONS'
);

@Component({
  selector: 'es-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ESEmptyStateComponent {
  private _icon: ESEmptyStateIcon;

  /**
   * Icon to diaplsy.
   */
  @Input()
  public get icon(): ESEmptyStateIcon {
    return this._icon;
  }
  public set icon(value: ESEmptyStateIcon | undefined) {
    this._icon = value || this.defaultOptions?.icon || 'box';
  }

  /**
   * Path to image to display instead of the prebuilt icon.
   */
  @Input() public src?: string;

  /**
   * Heading text.
   */
  @Input() public heading: string;

  private _headingTypography: string;

  /**
   * Class applied to heading text.
   */
  @Input()
  public get headingTypography(): string {
    return this._headingTypography;
  }
  public set headingTypography(value: string | undefined) {
    this._headingTypography = value || this.defaultOptions?.headingTypography || 'es-body-200';
  }

  /**
   * Subheading text.
   */
  @Input() public subheading: string;

  private _subheadingTypography: string;

  /**
   * Class applied to subheading text.
   */
  @Input()
  public get subheadingTypography(): string {
    return this._subheadingTypography;
  }
  public set subheadingTypography(value: string | undefined) {
    this._subheadingTypography = value || this.defaultOptions?.subheadingTypography || 'es-caption';
  }

  /**
   * @internal
   * @ignore
   */
  constructor(
    /**
     * @internal
     */
    public changeDetector: ChangeDetectorRef,
    /**
     * @internal
     */
    @Optional()
    @Inject(ES_EMPTY_STATE_DEFAULT_OPTIONS)
    private defaultOptions: ESEmptyStateDefaultOptions
  ) {
    this.icon = this.defaultOptions?.icon;
    this.headingTypography = this.defaultOptions?.headingTypography;
    this.subheadingTypography = this.defaultOptions?.subheadingTypography;
  }
}
