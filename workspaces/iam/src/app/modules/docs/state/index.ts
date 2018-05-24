import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from 'environments/environment';
import * as fromDocument from './document.reducer';
import * as fromRoot from '../../../reducers';

export * from './document.effects.actions';
export * from './document.actions';

export interface State extends fromRoot.State {
  docs: DocsState;
}

export interface DocsState {
  document: fromDocument.State;
}
export const reducers: ActionReducerMap<DocsState> = {
  document: fromDocument.reducer,
};

export const getDocsState = createFeatureSelector<DocsState>('docs');
export const getDocumentState = createSelector(getDocsState,state=>state.document);
export const getDocumentsState = createSelector(getDocumentState,fromDocument.selectAll);
export const getDocumentEntitiesState = createSelector(getDocumentState,fromDocument.selectEntities);
export const getDocumentActionStatusState = createSelector(getDocumentState,state=>state.actionStatus);
export const getCurrentDocumentIdState = createSelector(getDocumentState,fromDocument.selectCurrentDocumentId);
export const getCurrentDocumentState = createSelector(getDocumentEntitiesState, getCurrentDocumentIdState,(entities,id)=>entities[id]);
