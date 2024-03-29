import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISorting, ISortingOption } from '../sorting.types';
import { SortDirection } from '@angular/material/sort';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-wrapper',
  template: `
    <es-sorting
      (sortingChanged)="sortingChanged.emit($event)"
      [value]="value"
      [disabled]="disabled"
      [sortingOptions]="sortingOptions"
      [defaultDirection]="defaultDirection"
      [placeholder]="placeholder">
    </es-sorting>
    <div>
      <span>sortingChanged:</span>
      {{ sortingChanged | async | json }}
    </div>
  `,
})
export class DemoWrapperComponent {
  @Output() public sortingChanged = new EventEmitter<ISorting>();
  @Input() value: ISorting = { sortBy: '', direction: '' };
  @Input() disabled = false;
  @Input() placeholder = 'Sort';
  @Input() defaultDirection!: SortDirection;
  @Input() sortingOptions: ISortingOption[] = [];
}
