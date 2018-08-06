import { createSelector } from '@ngrx/store';
import { getActionStatusMonitorState } from '../reducers';
import { selectActionStatus } from './reducer';

export const getActionStatusState = createSelector(getActionStatusMonitorState, selectActionStatus);
