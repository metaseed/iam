import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SharedState } from '../state-reducers';
import { ActionStatusState } from './action-status';

export const selectActionStatus = (state: ActionStatusState) => state.actionStatus;

export const selectCoreState = createFeatureSelector<SharedState>('shared');
export const selectActionS = createSelector(selectCoreState, s => s.actionStatus);
export const selectActionStatusState = createSelector(selectActionS, selectActionStatus);
