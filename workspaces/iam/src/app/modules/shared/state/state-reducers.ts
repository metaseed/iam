import { ActionReducerMap } from '@ngrx/store';
import { actionStatusReducer, ActionStatusState } from './action-stauts';
import { documentReducer, DocumentState } from './document/document.reducer';
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
