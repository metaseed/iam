import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoreState } from '../state-reducers';
import { selectActionStatus } from './reducer';

export const selectCoreState = createFeatureSelector<CoreState>('core');
export const selectActionS = createSelector(selectCoreState, s => s.actionStatus);
export const selectActionStatusState = createSelector(selectActionS, selectActionStatus);
