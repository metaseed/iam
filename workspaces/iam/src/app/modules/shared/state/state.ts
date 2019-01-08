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

export const reducers: ActionReducerMap<SharedState> = {
  actionMonitor: actionMonitorReducer,
  document: documentReducer
};

export const selectSharedState = createFeatureSelector<SharedState>(moduleStateName);

export const selectDocumentState = createSelector(
  selectSharedState,
  state => state.document
);

export const selectActionStatusMonitorState = createSelector(
  selectSharedState,
  s => s.actionMonitor
);
