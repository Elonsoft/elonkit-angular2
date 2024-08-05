import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  InjectionToken,
  Input,
  Optional,
  ViewEncapsulation,
} from '@angular/core';

import { ESEmptyStateIcon } from './empty-state.types';

export interface ESEmptyStateDefaultOptions {
  icon?: ESEmptyStateIcon;
  size?: string;
}

export const ES_EMPTY_STATE_DEFAULT_OPTIONS = new InjectionToken<ESEmptyStateDefaultOptions>('ES_EMPTY_STATE_DEFAULT_OPTIONS');

@Component({
  selector: 'es-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ESEmptyStateComponent {
  private _icon: ESEmptyStateIcon;

  /**
   * Icon to display.
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

  /**
   * Subheading text.
   */
  @Input() public subheading: string;

  private _size: string;

  /**
   * Size of empty-state.
   */
  @Input()
  public get size(): string {
    return this._size;
  }
  public set size(value: string | undefined) {
    this._size = value || this.defaultOptions?.size || 'medium';
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
    this.size = this.defaultOptions?.size;
  }
}
