import { createSelector } from '@ngrx/store';
import { getActionMonitorState } from '../reducers';
import { selectActionStatus } from './reducer';

export const getActionStatusState = createSelector(getActionMonitorState, selectActionStatus);
