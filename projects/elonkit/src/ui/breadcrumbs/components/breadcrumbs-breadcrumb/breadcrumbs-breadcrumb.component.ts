import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';

import { ESBreadcrumb } from '../../breadcrumbs.types';

import { ESLocale, ESLocaleService } from '../../../locale';

@Component({
  selector: 'es-breadcrumbs-breadcrumb',
  templateUrl: './breadcrumbs-breadcrumb.component.html',
  styleUrls: ['./breadcrumbs-breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ESBreadcrumbsBreadcrumbComponent {
  /**
   * @internal
   */
  @Input() public breadcrumb: ESBreadcrumb;

  /**
   * @internal
   */
  @Input() public last = false;

  /**
   * @internal
   */
  @Input() public typography: string;

  /**
   * @internal
   * @ignore
   */
  public locale$: Observable<ESLocale>;

  constructor(
    /**
     * @internal
     */
    public localeService: ESLocaleService
  ) {
    this.locale$ = this.localeService.locale();
  }

  /**
   * @internal
   * @ignore
   */
  public onAction() {
    if (this.breadcrumb.callback) {
      this.breadcrumb.callback();
    }
  }
}
