import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter,
  InjectionToken,
  Optional,
  Inject,
  ElementRef,
  AfterContentChecked,
  ViewChild,
} from '@angular/core';

import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { BehaviorSubject, Observable } from 'rxjs';

import { ESAlertVariant } from './alert.types';
import { ESLocaleService, ESLocale } from '../locale';

export interface ESAlertDefaultOptions {
  typography?: string;
  titleTypography?: string;
  iconMapping?: { [key in ESAlertVariant]?: { icon?: string; svgIcon?: string } };
}

const DEFAULT_TYPOGRAPHY = 'es-body-100';
const DEFAULT_TITLE_TYPOGRAPHY = 'es-body-100';

const DEFAULT_ICON_MAPPING = {
  default: { icon: 'info' },
  info: { icon: 'info' },
  success: { icon: 'check_circle' },
  warning: { icon: 'warning' },
  error: { icon: 'error' },
};

export const ES_ALERT_DEFAULT_OPTIONS = new InjectionToken<ESAlertDefaultOptions>('ES_ALERT_DEFAULT_OPTIONS');

@Component({
  selector: 'es-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ESAlertComponent implements AfterContentChecked {
  @ViewChild('actions') actions!: ElementRef;
  private iconMapping: { [key in ESAlertVariant]: { icon?: string; svgIcon?: string } };

  /**
   * The severity of the alert. This defines the color and icon used.
   */
  @Input() public severity: ESAlertVariant = 'default';

  /**
   * The color of the component. Unless provided, the value is taken from the severity prop.
   */
  @Input() public color: string;

  /**
   * @ignore
   */
  protected isWithActions = new BehaviorSubject<boolean>(false);

  /**
   * @ignore
   */
  protected mainPadding = {
    withActions: '11px 15px',
    withoutActions: '7px 15px',
  };

  /**
   * @ignore
   */
  protected closeMargin = {
    withActions: '2px',
    withoutActions: '8px',
  };

  /**
   * @internal
   * @ignore
   */
  ngAfterContentChecked(): void {
    this.isWithActions.next(this.actions?.nativeElement?.children?.length ? true : false);
  }

  /**
   * @ignore
   */
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

  /**
   * @ignore
   */
  private _titleTypography: string;

  /**
   * Class applied to title.
   */
  @Input()
  public get titleTypography(): string {
    return this._titleTypography;
  }
  public set titleTypography(value: string) {
    this._titleTypography = value || (this.defaultOptions && this.defaultOptions.titleTypography) || DEFAULT_TITLE_TYPOGRAPHY;
  }

  /**
   * @ignore
   */
  private _closable = false;

  /**
   * Show close button.
   */
  @Input()
  public get closable() {
    return this._closable;
  }
  public set closable(closable: any) {
    this._closable = coerceBooleanProperty(closable);
  }

  /**
   * Disables icon.
   */
  @Input() public hasIcon?: boolean = true;

  /**
   * Override the icon displayed before the text.
   * Unless provided, the icon is mapped to the value of the variant input.
   */
  @Input() public icon?: string;

  /**
   * Override the icon displayed before the text.
   * Unless provided, the icon is mapped to the value of the variant input.
   */
  @Input() public svgIcon?: string;

  /**
   * Event emitted when user clicks close button.
   */
  @Output() public closed = new EventEmitter();

  /**
   * @internal
   * @ignore
   */
  public locale$: Observable<ESLocale>;

  /**
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
    private localeService: ESLocaleService,
    /**
     * @internal
     */
    @Optional()
    @Inject(ES_ALERT_DEFAULT_OPTIONS)
    private defaultOptions: ESAlertDefaultOptions
  ) {
    this.locale$ = this.localeService.locale();

    this.typography = (defaultOptions && defaultOptions.typography) || DEFAULT_TYPOGRAPHY;
    this.titleTypography = (defaultOptions && defaultOptions.titleTypography) || DEFAULT_TITLE_TYPOGRAPHY;
    this.iconMapping = { ...DEFAULT_ICON_MAPPING, ...defaultOptions?.iconMapping };
  }

  /**
   * @internal
   * @ignore
   */
  public onClose() {
    this.closed.emit();
  }

  public get currentIcon(): any {
    if (this.icon) {
      return { icon: this.icon };
    }
    if (this.svgIcon) {
      return { svgIcon: this.svgIcon };
    }
    return this.iconMapping[this.severity];
  }
}
