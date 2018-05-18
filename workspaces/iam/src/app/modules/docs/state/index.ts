import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from 'environments/environment';
import * as fromDocument from './collection-document.reducer';

export interface State {

  document: fromDocument.State;
}

export const reducers: ActionReducerMap<State> = {

  document: fromDocument.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const getDocsState = createFeatureSelector<fromDocument.State>('docs');
export const getDocumentsState = createSelector(getDocsState,fromDocument.selectAll);
export const getDocumentEntitiesState = createSelector(getDocsState,fromDocument.selectEntities);
export const getCurrentDocumentIdState = createSelector(getDocsState,fromDocument.selectCurrentDocumentId);
export const getCurrentDocumentState = createSelector(getDocumentEntitiesState, getCurrentDocumentIdState,(entities,id)=>entities[id]);
