import { bind } from '@react-rxjs/core';
import { createSignal } from '@react-rxjs/utils';
import { startWith } from 'rxjs';

export enum FilterType {
  All = 'all',
  Done = 'done',
  Pending = 'pending'
}
export const [selectedFilter$, onSelectFilter] = createSignal<FilterType>();

export const [useCurrentFilter, currentFilter$] = bind(
  selectedFilter$.pipe(startWith(FilterType.All))
);
