import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ESSidebarMenuService } from './sidebar-menu.service';

@Component({
  selector: 'es-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ESSidebarMenuComponent implements OnInit {
  @Input() behaviour: 'click' | 'hover' = 'click';
  @Input() exclusive = false;

  constructor(public menuService: ESSidebarMenuService) {}

  public ngOnInit() {
    this.menuService.setConfig(this.behaviour, this.exclusive);
  }
}
