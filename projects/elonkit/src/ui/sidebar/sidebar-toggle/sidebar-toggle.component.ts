import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';

import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

import { ESLocale, ESLocaleService } from '../../locale';
import { ESSidebarCommonAttrService } from '../sidebar-common-attr.service';

@Component({
  selector: 'es-sidebar-toggle',
  templateUrl: './sidebar-toggle.component.html',
  styleUrls: ['./sidebar-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ESSidebarToggleComponent {
  @Input() labelOpen = '';
  @Input() labelClose = '';
  @Input()
  get isOpen(): boolean {
    return this._isOpen;
  }
  set isOpen(value: BooleanInput) {
    this._isOpen = coerceBooleanProperty(value);
  }
  private _isOpen = false;

  @Output() openEvent = new EventEmitter<boolean>(false);

  public locale$: Observable<ESLocale>;

  constructor(
    public cas: ESSidebarCommonAttrService,
    private localeService: ESLocaleService
  ) {
    this.locale$ = this.localeService.locale();
  }

  public _onClick(): void {
    this.isOpen = !this.isOpen;
    this.openEvent.emit(this.isOpen);
  }
}
