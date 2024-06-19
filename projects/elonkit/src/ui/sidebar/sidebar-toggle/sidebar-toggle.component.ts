import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { ESSidebarCommonAttrService } from '../sidebar-common-attr.service';

@Component({
  selector: 'es-sidebar-toggle',
  templateUrl: './sidebar-toggle.component.html',
  styleUrls: ['./sidebar-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ESSidebarToggleComponent {
  @Input() labelOpen = 'Expand';
  @Input() labelClose = 'Collapse';
  @Input()
  get isOpen(): boolean {
    return this._isOpen;
  }
  set isOpen(value: BooleanInput) {
    this._isOpen = coerceBooleanProperty(value);
  }
  private _isOpen = false;

  @Output() openEvent = new EventEmitter<boolean>(false);

  constructor(private cas: ESSidebarCommonAttrService) {}

  public _onClick(): void {
    this.isOpen = !this.isOpen;
    this.openEvent.emit(this.isOpen);
  }
}
