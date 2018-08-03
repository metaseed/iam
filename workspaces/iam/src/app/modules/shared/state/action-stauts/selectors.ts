import { createSelector } from '@ngrx/store';
import { selectActionState } from '../reducers';
import { ActionStatusState } from './reducer';

export const selectActionStatus = (state: ActionStatusState) => state.actionStatus;
export const selectActionStatusState = createSelector(selectActionState, selectActionStatus);
