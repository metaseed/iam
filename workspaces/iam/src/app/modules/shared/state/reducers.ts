import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { actionMonitorReducer, ActionMonitorState } from './action-stauts/reducer';
import { documentReducer, DocumentState } from './document/reducer';
import * as fromRoot from '../../../state';

export const moduleStateName = 'shared';

export interface State extends fromRoot.State {
  [moduleStateName]: SharedState;
}

export interface SharedState {
  actionMonitor: ActionMonitorState;
  document: DocumentState;
}

export const sharedReducers: ActionReducerMap<SharedState> = {
  actionMonitor: actionMonitorReducer,
  document: documentReducer
};

export const getSharedState = createFeatureSelector<SharedState>(moduleStateName);

export const getDocumentState = createSelector(getSharedState, state => state.document);
export const getActionStatusMonitorState = createSelector(getSharedState, s => s.actionMonitor);
