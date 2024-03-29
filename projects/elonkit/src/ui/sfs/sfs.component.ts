import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { animate, animateChild, group, query, state, style, transition, trigger } from '@angular/animations';

import { ISorting, ISortingOption, ESSortingComponent } from '../sorting';
import { ISFSFieldValue } from './sfs.types';
import { ESSFSChipVisibilityDirective } from './sfs-chip-visibility.directive';

const TRANSITION_DURATION = 400;
const TRANSITION = `${TRANSITION_DURATION}ms cubic-bezier(0.25, 0.8, 0.25, 1)`;

@Component({
  selector: 'es-sfs',
  templateUrl: 'sfs.component.html',
  styleUrls: ['sfs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ESSortingComponent,
    MatDividerModule,
    MatButtonModule,
    MatChipsModule,
    ESSFSChipVisibilityDirective,
  ],
  animations: [
    trigger('drawer', [
      state('void', style({ backgroundColor: 'transparent' })),
      transition('void <=> *', [group([query('@content', animateChild()), animate(TRANSITION)])]),
    ]),
    trigger('content', [
      state('void', style({ transform: 'translateX(100%)' })),
      state('*', style({ transform: 'translateX(0)' })),
      transition('void <=> *', [animate(TRANSITION)]),
    ]),
  ],
})
export class ESSFSComponent {
  @Input() public showFiltersButton = true;
  @Input() public showSearchInpuit = true;
  @Input() public count: number | null = 0;
  @Input() public sortingOptions: Array<ISortingOption> = [];
  @Input() public set filterFieldsValues(filterFieldsValues: ISFSFieldValue[]) {
    this._filterFieldsValues = filterFieldsValues;
  }
  public get filterFieldsValues(): ISFSFieldValue[] {
    return this._filterFieldsValues;
  }
  private _filterFieldsValues: ISFSFieldValue[] = [];

  @Output() public clear = new EventEmitter();
  @Output() public sortingChanged = new EventEmitter<ISorting>();
  @Output() public filterFieldValueRemoved = new EventEmitter<ISFSFieldValue>();
  @Output() public searchTerm = new EventEmitter<string>();

  public isOpen = false;

  public text = '';

  public onToggle(isOpen: boolean) {
    this.isOpen = isOpen;
  }

  public onDrawerClick(event: MouseEvent) {
    this.onToggle(false);
  }

  public onContentClick(event: MouseEvent) {
    event.stopPropagation();
  }

  public onClear() {
    this.clear.emit();
  }

  public onRemoveFiltersValue(value: ISFSFieldValue) {
    this.filterFieldValueRemoved.emit(value);
  }

  public trackByIndex(_: number, item: ISFSFieldValue): string {
    return item.fieldKey;
  }

  public onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.text = value;

    this.searchTerm.emit(this.text);
  }

  public onClearSearch() {
    this.text = '';
    this.searchTerm.emit('');
  }
}
