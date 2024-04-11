/* eslint-disable @angular-eslint/component-selector */
import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'demo-wrapper',
  template: `
    <div style="padding: 16px;">
      <es-paginator
        [pageInputBefore]="pageInputBefore"
        [reverse]="reverse"
        [hidePageSize]="hidePageSize"
        [count]="count"
        [siblingCount]="siblingCount"
        [boundaryCount]="boundaryCount"
        [page]="(page$ | async) || 1"
        [pageSize]="(pageSize$ | async) || 50"
        (pageChange)="onPageChange($event)"
        (pageSizeChange)="onPageSizeChange($event)">
      </es-paginator>
    </div>

    <br />
    <span class="es-caption">You are on {{ page$ | async }} page</span>
  `,
})
export class DemoWrapperComponent {
  @Input() public pageInputBefore = false;
  @Input() public reverse = false;
  @Input() public hidePageSize = false;
  @Input() public count = 1000;
  @Input() public siblingCount = 1;
  @Input() public boundaryCount = 1;

  public page$ = new BehaviorSubject(1);
  public pageSize$ = new BehaviorSubject(50);

  public onPageChange(event: number) {
    this.page$.next(event);
  }

  public onPageSizeChange(event: number) {
    this.pageSize$.next(event);
  }

  constructor() {}
}
