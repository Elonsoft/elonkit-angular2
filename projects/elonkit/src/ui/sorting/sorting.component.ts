import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

import { ISorting, ISortingOption } from './sorting.types';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SortDirection } from '@angular/material/sort';

import { OverlayModule } from '@angular/cdk/overlay';

const DEFAULT_SORTING_VALUE: ISorting = { sortBy: '', direction: '' };

@Component({
  selector: 'es-sorting',
  templateUrl: 'sorting.component.html',
  styleUrls: ['sorting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, MatIconModule, MatListModule, OverlayModule],
})
export class ESSortingComponent {
  @Input() public sortingOptions: Array<ISortingOption> = [];

  @Input() public set defaultDirection(defaultDirection: SortDirection) {
    this.direction = defaultDirection;

    this._defaultDirection = defaultDirection;
  }
  public get defaultDirection() {
    return this._defaultDirection;
  }
  private _defaultDirection: SortDirection = 'asc';

  @Input()
  public get placeholder() {
    return this._placeholder;
  }
  public set placeholder(placeholder) {
    this._placeholder = placeholder;
  }
  private _placeholder!: string;

  @Input()
  public get disabled() {
    return this._disabled;
  }
  public set disabled(disabled: boolean) {
    this._disabled = disabled;
  }
  private _disabled = false;

  @Input()
  public get value(): ISorting {
    return this._value;
  }
  public set value(value: ISorting | null) {
    this._value = value ? { ...value } : DEFAULT_SORTING_VALUE;

    this.direction = value?.direction ? value?.direction : this.defaultDirection;
  }
  private _value: ISorting = DEFAULT_SORTING_VALUE;

  @Output() public sortingChanged = new EventEmitter<ISorting>();

  public direction: SortDirection = 'asc';
  public isOpen = false;

  constructor() {}

  public onContainerClick() {
    if (this.disabled) {
      return;
    }

    this.isOpen = true;
  }

  public onReset() {
    this.value = null;

    this.sortingChanged.emit(this.value);
  }

  public onOptionClick(option: ISortingOption) {
    const { sortBy } = option;

    this.direction = this.defaultDirection;
    this.value = sortBy === this.value.sortBy ? DEFAULT_SORTING_VALUE : { sortBy: sortBy, direction: this.direction };

    this.sortingChanged.emit(this.value);
  }

  public onChangeSortDirection(event: MouseEvent) {
    event.stopPropagation();

    this.direction = this.direction === 'asc' ? 'desc' : 'asc';
    this.value = { sortBy: this.value.sortBy, direction: this.direction };

    this.sortingChanged.emit(this.value);
  }

  public onClose() {
    this.isOpen = false;
  }

  public isOptionSelected(option: string): boolean {
    return option === this.value.sortBy;
  }

  public displayWith(value: string): string {
    return this.sortingOptions.find((option) => option.sortBy === value)?.label || '';
  }
}
