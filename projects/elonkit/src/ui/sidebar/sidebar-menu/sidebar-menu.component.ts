import { ChangeDetectionStrategy, Component, Input, OnChanges, ViewEncapsulation } from '@angular/core';

import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

import { ESSidebarMenuService } from './sidebar-menu.service';

@Component({
  selector: 'es-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ESSidebarMenuService],
})
export class ESSidebarMenuComponent implements OnChanges {
  @Input() behaviour: 'click' | 'hover' = 'click';
  @Input()
  get exclusive(): boolean {
    return this._exclusive;
  }
  set exclusive(value: BooleanInput) {
    this._exclusive = coerceBooleanProperty(value);
  }
  private _exclusive = false;

  constructor(public menuService: ESSidebarMenuService) {}

  public ngOnChanges(): void {
    this.menuService.setConfig(this.behaviour, this.exclusive);
  }
}
