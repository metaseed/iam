import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from 'environments/environment';
import * as fromDocument from './document.reducer';
import { SharedState } from '../state-reducers';

export const selectDocsState = createFeatureSelector<SharedState>('shared');
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

export const selectIdRangeHighState = createSelector(
  selectDocumentState,
  fromDocument.selectDocumentIdsRangeHigh
);

export const selectIdRangeLowState = createSelector(
  selectDocumentState,
  fromDocument.selectDocumentIdsRangeLow
);

export const getDocumentByIdSeletor = (id: number) => {
  return createSelector(selectDocumentEntitiesState, entities => entities[id]);
};
