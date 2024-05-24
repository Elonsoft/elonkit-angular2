import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'es-sidebar-toggle',
  templateUrl: './sidebar-toggle.component.html',
  styleUrls: ['./sidebar-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ESSidebarToggleComponent {
  @Input() color: 'default' | 'primary' | 'secondary' = 'default';
  @Input() isOpen = false;
  @Input() labelOpen = 'Expand';
  @Input() labelClose = 'Collapse';

  @Output() openEvent = new EventEmitter<boolean>(false);

  public _onClick(): void {
    this.isOpen = !this.isOpen;
    this.openEvent.emit(this.isOpen);
  }
}
