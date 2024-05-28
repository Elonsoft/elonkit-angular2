import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { ESSidebarMenuService } from '../public-api';
import { P } from '@angular/cdk/keycodes';

@Component({
  selector: 'es-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ESSidebarItemComponent implements AfterViewInit, OnChanges {
  @Input() icon = '';
  @Input() text = '';
  @Input() id?: number;
  @Input() isOpen = false;
  @Input() color: 'default' | 'primary' | 'secondary' = 'default';
  @Input() isNestedMenuOpen?: boolean | null = null;

  @Output() itemClick = new EventEmitter<void>();

  public behaviour: 'click' | 'hover' = 'click';

  constructor(public menuService: ESSidebarMenuService) {}

  public ngAfterViewInit(): void {
    console.log('init');
    this.behaviour = this.menuService.behaviour;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    console.log('changes');
    this.behaviour = this.menuService.behaviour;
  }
}
