/* eslint-disable @angular-eslint/component-selector */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
// import { ISorting, ISortingOption } from '../sorting.types';
import { SortDirection } from '@angular/material/sort';
import { ISFSFieldValue, ISorting, ISortingOption } from 'projects/elonkit/src/public-api';
import { Observable, map, shareReplay, startWith } from 'rxjs';

@Component({
  selector: 'demo-wrapper',
  template: `
    <!-- <es-sorting
    (sortingChanged)="sortingChanged.emit($event)"
    [value]='value'
    [disabled]="disabled"
    [sortingOptions]="sortingOptions"
    [defaultDirection]="defaultDirection"
    [placeholder]="placeholder">
  </es-sorting> -->

    <es-sfs
      [formGroup]="filters"
      [showFiltersButton]="showFiltersButton"
      [showSearchInpuit]="showSearchInpuit"
      [count]="mockValues ? count : (filtersCount$ | async)"
      [sortingOptions]="sortingOptions"
      [filterFieldsValues]="mockValues ? filterFieldsValues : (filterFieldsValues$ | async) || []"
      (sortingChanged)="sortingChanged.emit($event)"
      (clear)="onFiltersClear()"
      (filterFieldValueRemoved)="filterFieldValueRemoved.emit($event)"
      (searchTerm)="searchTerm.emit($event)">
      <h6 class="es-body-200">Фильтров пока нет</h6>
      <div class="es-caption">Сюда должны прокидываться автокомплиты, но они в другой ветке</div>

      <!-- <mat-form-field appearance="outline">
      <mat-label>Автор</mat-label>
      <app-autocomplete-multiple
        formControlName="authors"
        [service]="autocompleteAuthorService"
        [displayWith]="authorsDisplayWith"
      ></app-autocomplete-multiple>
    </mat-form-field> -->

      <!-- <mat-form-field appearance="outline">
      <mat-label>Ширина, мм</mat-label>
      <app-range-measure-select
        formControlName="width"
        [startOptionVariants]="rangeOptionVariants"
        [endOptionVariants]="rangeOptionVariants"
      ></app-range-measure-select>
    </mat-form-field> -->

      <!-- <mat-form-field appearance="outline">
      <mat-label>Толщина, мм</mat-label>
      <app-range-measure-select
        formControlName="height"
        [startOptionVariants]="rangeOptionVariants"
        [endOptionVariants]="rangeOptionVariants"
      ></app-range-measure-select>
    </mat-form-field> -->
    </es-sfs>

    <br />
    <div class="es-body-100">
      <span>sortingChanged:</span>
      {{ sortingChanged | async | json }}
    </div>
    <br />
    <div class="es-body-100">
      <span>filters valuers:</span>
      {{ filterFieldsValues$ | async | json }}
    </div>
    <br />
    <div class="es-body-100">
      <span>filterFieldValueRemoved:</span>
      {{ filterFieldValueRemoved | async | json }}
    </div>
    <br />
    <div class="es-body-100">
      <span>searchTerm:</span>
      {{ searchTerm | async }}
    </div>
  `,
})
export class DemoWrapperComponent {
  @Input() mockValues = false;

  public filters: FormGroup;
  public filtersCount$: Observable<number>;
  public filterFieldsValues$: Observable<ISFSFieldValue[]>;

  @Input() showFiltersButton = true;
  @Input() showSearchInpuit = true;
  @Input() count: number | null = 0;
  @Input() sortingOptions: ISortingOption[] = [];
  @Input() filterFieldsValues: ISFSFieldValue[] = [
    { fieldKey: 'mock_key_1', index: 1, value: 'mock_val_1' },
    { fieldKey: 'mock_key_2', index: 2, value: 'mock_val_2' },
  ];

  @Output() public sortingChanged = new EventEmitter<ISorting>();
  @Output() public filterFieldValueRemoved = new EventEmitter<ISFSFieldValue>();
  @Output() public searchTerm = new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder) {
    this.filters = formBuilder.group({
      authors: [[]],
      width: [{ start: null, end: null }],
      height: [{ start: null, end: null }],
    });

    this.filtersCount$ = this.filters.valueChanges.pipe(
      startWith(this.filters.value),
      map((filters) => {
        let count = 0;

        if (filters.authors.length) {
          count++;
        }
        if (filters.width.start || filters.width.end) {
          count++;
        }
        if (filters.height.start || filters.height.end) {
          count++;
        }

        return count;
      }),
      shareReplay(1)
    );

    this.filterFieldsValues$ = this.filters.valueChanges.pipe(
      startWith(this.filters.value),
      map((filters) => this.transformFilters(filters))
    );
  }

  private transformFilters(filters: any): ISFSFieldValue[] {
    const values: ISFSFieldValue[] = [];

    for (const key of Object.keys(filters)) {
      if (filters[key] instanceof Array && !!filters[key].length) {
        filters[key].forEach((value: any, index: number) => {
          if (typeof value !== 'object') {
            values.push({ fieldKey: key, index, value });
          } else {
            values.push({ fieldKey: key, index, value: value?.name || value?.value });
          }
        });
      } else if (typeof filters[key] === 'object' && ['width', 'height'].includes(key)) {
        const { start, end } = filters[key];

        const value = this.getFilterFieldValueForRange(key, start, end);

        if (value) {
          values.push(value);
        }
      }
    }

    return values;
  }

  private getFilterFieldValueForRange(key: string, start: any, end: any): ISFSFieldValue | null {
    if (start && end) {
      const date = `${start} - ${end}`;

      return { fieldKey: key, value: date };
    } else if (start) {
      const date = `${start}`;

      return { fieldKey: key, value: date };
    } else if (end) {
      const date = `${end}`;

      return { fieldKey: key, value: date };
    }

    return null;
  }

  public onFiltersClear() {
    console.log('clear pushed');
    this.filters.patchValue({
      authors: [],
      width: { start: null, end: null },
      height: { start: null, end: null },
    });
  }
}
