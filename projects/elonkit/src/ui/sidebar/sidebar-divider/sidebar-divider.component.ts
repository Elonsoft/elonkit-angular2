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
  @Input() isOpen = false;
}
