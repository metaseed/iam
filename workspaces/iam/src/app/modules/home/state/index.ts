import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from 'environments/environment';
import * as fromDocument from './document.reducer';
import * as fromRoot from '../../../state';
import { DocumentEffectsActions } from '.';

export * from './document.effects.actions';
export * from './document.actions';

export interface State extends fromRoot.State {
  docs: DocsState;
}

export interface DocsState {
  document: fromDocument.State;
}
export const reducers: ActionReducerMap<DocsState> = {
  document: fromDocument.reducer
};

export const selectDocsState = createFeatureSelector<DocsState>('docs');
export const selectDocumentState = createSelector(selectDocsState, state => state.document);
export const selectDocumentsState = createSelector(selectDocumentState, fromDocument.selectAll);
export const selectDocumentEntitiesState = createSelector(
  selectDocumentState,
  fromDocument.selectEntities
);
export const selectCurrentDocumentIdState = createSelector(
  selectDocumentState,
  fromDocument.selectCurrentDocumentId
);
export const selectCurrentDocumentState = createSelector(
  selectDocumentEntitiesState,
  selectCurrentDocumentIdState,
  (entities, id) => entities[id]
);
export const selectDocumentActionStatusState = createSelector(
  selectDocumentState,
  fromDocument.selectDocumentActionStatus
);

export const selectKeyRangeHighState = createSelector(
  selectDocumentState,
  fromDocument.selectDocumentsKeyRangeHigh
);

export const selectKeyRangeLowState = createSelector(
  selectDocumentState,
  fromDocument.selectDocumentsKeyRangeLow
);

export const getDocumentByIdSeletor = (id: number) => {
  return createSelector(selectDocumentEntitiesState, entities => entities[id]);
};
