import { SortDirection } from '@angular/material/sort';

export interface ISorting {
  sortBy: string;
  direction: SortDirection;
}

export interface ISortingOption {
  directionLabels: IDirectionLabels;
  sortBy: string;
  label: string;
}

export interface IDirectionLabels {
  asc: string;
  desc: string;
}
