import { createSelector } from '@ngrx/store';
import { selectActionStatusMonitorState } from '../state';
import { selectActionStatus } from './reducer';

export const getActionStatusState = createSelector(
  selectActionStatusMonitorState,
  selectActionStatus
);
