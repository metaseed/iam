import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { actionStatusReducer, ActionStatusState } from './action-stauts/reducer';
import { documentReducer, DocumentState } from './document/reducer';
import * as fromRoot from '../../../state';

export const moduleStateName = 'shared';

export interface State extends fromRoot.State {
  [moduleStateName]: SharedState;
}

export interface SharedState {
  actionStatus: ActionStatusState;
  document: DocumentState;
}

export const sharedReducers: ActionReducerMap<SharedState> = {
  actionStatus: actionStatusReducer,
  document: documentReducer
};

export const getSharedState = createFeatureSelector<SharedState>(moduleStateName);

export const getDocumentState = createSelector(getSharedState, state => state.document);
export const selectActionState = createSelector(getSharedState, s => s.actionStatus);
