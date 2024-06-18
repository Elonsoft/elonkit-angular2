import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { ESSidenavService } from '../sidenav.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'es-sidenav-item',
  templateUrl: './sidenav-item.component.html',
  styleUrls: ['./sidenav-item.component.scss'],
})
export class ESSidenavItemComponent {
  @Input() icon = '';
  @Input() text = '';
  @Input() id?: string;
  @Input() color: 'default' | 'primary' | 'secondary' = 'default';
  @Input() selected = false;
  @Input() disabled = false;

  @Output() itemClick = new EventEmitter<void>();

  constructor(
    private ss: ESSidenavService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  public _onItemKeyDown(event: KeyboardEvent): void {
    const railSidebar = this.document.querySelector('#rail');
    const drawerSidebar = this.document.querySelector('#drawer');

    if (event.key === 'ArrowRight') {
      const firstDrawerButton = drawerSidebar?.querySelector('.es-sidebar-item__button') as HTMLButtonElement;
      firstDrawerButton.focus();
    }

    if (event.key === 'ArrowLeft') {
      const currentRailButton = railSidebar?.querySelector(`#${this.id}`) as HTMLButtonElement;
      currentRailButton.focus();
      // Вывести в отдельный метод и пересадить на drawer
    }
  }

  public _openDrawer(): void {
    if (!this.id) return;
    this.ss.openDrawer(this.id);
  }

  public _onItemTouchStart(event: TouchEvent): void {
    if (this.disabled) return;

    this.itemClick.emit();
    event.preventDefault();
  }

  public _onItemClick(): void {
    if (this.disabled) return;
    this.itemClick.emit();
  }
}
