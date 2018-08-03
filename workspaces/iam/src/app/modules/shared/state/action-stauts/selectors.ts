import { createSelector } from '@ngrx/store';
import { selectActionState } from '../reducers';
import { selectActionStatus } from './reducer';

export const selectActionStatusState = createSelector(selectActionState, selectActionStatus);
