import { Component, Input } from '@angular/core';

@Component({
  selector: 'es-sidenav-item',
  templateUrl: './sidenav-item.component.html',
  styleUrls: ['./sidenav-item.component.scss'],
})
export class ESSidenavItemComponent {
  @Input() icon = '';
  @Input() text = '';
  @Input() id?: string;
  @Input() isOpen = false;
  @Input() color: 'default' | 'primary' | 'secondary' = 'default';
  @Input() selected = false;
  @Input() disabled = false;
}
