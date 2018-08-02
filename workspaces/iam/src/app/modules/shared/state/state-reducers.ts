import { ActionReducerMap } from '@ngrx/store';
import { actionStatusReducer, ActionStatusState } from './action-stauts';
import { documentReducer, DocumentState } from './document/document.reducer';
import * as fromRoot from '../../../state';

export interface State extends fromRoot.State {
  shared: SharedState;
}

export interface SharedState {
  actionStatus: ActionStatusState;
  document: DocumentState;
}

export const coreReducers: ActionReducerMap<SharedState> = {
  actionStatus: actionStatusReducer,
  document: documentReducer
};
