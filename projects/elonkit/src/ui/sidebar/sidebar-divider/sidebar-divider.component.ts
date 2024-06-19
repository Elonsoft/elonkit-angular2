import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'es-sidebar-divider',
  templateUrl: './sidebar-divider.component.html',
  styleUrls: ['./sidebar-divider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ESSidebarDividerComponent {
  @Input() color: 'default' | 'primary' | 'secondary' = 'default';
  @Input()
  get isOpen(): boolean {
    return this._isOpen;
  }
  set isOpen(value: BooleanInput) {
    this._isOpen = coerceBooleanProperty(value);
  }
  private _isOpen = false;
}
