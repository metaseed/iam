import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { actionStatusMonitorReducer, ActionStatusMonitorState } from './action-stauts/reducer';
import { documentReducer, DocumentState } from './document/reducer';
import * as fromRoot from '../../../state';

export const moduleStateName = 'shared';

export interface State extends fromRoot.State {
  [moduleStateName]: SharedState;
}

export interface SharedState {
  actionStatusMonitor: ActionStatusMonitorState;
  document: DocumentState;
}

export const sharedReducers: ActionReducerMap<SharedState> = {
  actionStatusMonitor: actionStatusMonitorReducer,
  document: documentReducer
};

export const getSharedState = createFeatureSelector<SharedState>(moduleStateName);

export const getDocumentState = createSelector(getSharedState, state => state.document);
export const getActionMonitorState = createSelector(getSharedState, s => s.actionStatusMonitor);
