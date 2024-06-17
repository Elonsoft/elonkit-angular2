import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Output() itemClick = new EventEmitter<void>();

  constructor(private ss: ESSidenavService) {

  }

  public _onItemKeyDown(event: KeyboardEvent): void {
    // const childrenArr = Array.from(this.tootipChildrenContainer.nativeElement.children) as HTMLElement[];
    // if (this.tooltipHeader.nativeElement.querySelector('button')) {
    //   childrenArr.unshift(this.tooltipHeader.nativeElement);
    // }

    // if (this.hasChildren && event.key === 'ArrowRight') {
    //   const childButton = childrenArr[0]?.querySelector('button') as HTMLButtonElement;
    //   childButton.focus();
    // }
  }

  public _onItemFocus(event: FocusEvent): void {
    console.log('focus:', event);
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
