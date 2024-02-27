export enum ERangeOption {
  start = 'start',
  end = 'end',
}

export interface IRangeOption {
  value: string | null;
  type: ERangeOption;
}

export interface IRangeSelect {
  start: string | null;
  end: string | null;
}
