import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';

import { ESSidenavService } from '../sidenav.service';

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

  @Output() itemClick = new EventEmitter<string | null>();

  constructor(
    private ss: ESSidenavService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  public _onItemKeyDown(event: KeyboardEvent): void {
    const drawerSidebar = this.document.querySelector('#drawer');

    if (event.key === 'ArrowRight') {
      const firstDrawerButton = drawerSidebar?.querySelector('.es-sidebar-item__button') as HTMLButtonElement;
      firstDrawerButton.focus();
    }
  }

  public _openDrawer(): void {
    this.id ? this.ss.openDrawer(this.id) : this.ss.closeDrawer();
  }

  public _onItemTouchStart(event: TouchEvent): void {
    if (this.disabled) return;
    if (this.id) this.ss.selectPage(this.id);
    this.itemClick.emit(this.id ? this.id : null);
    event.preventDefault();
  }

  public _onItemClick(): void {
    if (this.disabled) return;
    if (this.id) this.ss.selectPage(this.id);
    this.itemClick.emit(this.id ? this.id : null);
  }
}
