import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'es-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ESSidebarComponent {
  @Input() color = '';
  @Input() maxWidth = 400;
  @Input() minWidth = 100;
  @Input() isOpen = false;
  @Input() width = 300;

  @Output() widthChange = new EventEmitter<number>();

  public isMouseMove = false;
  public isMouseDown = false;
}
