import { createSelector } from '@ngrx/store';
import * as fromDocument from './reducer';
import { getDocumentState } from '../state-reducers';

export const getDocumentsState = createSelector(getDocumentState, fromDocument.selectAll);
export const getDocumentEntitiesState = createSelector(
  getDocumentState,
  fromDocument.selectEntities
);
export const selectCurrentDocumentIdState = createSelector(
  getDocumentState,
  fromDocument.selectCurrentDocumentId
);
export const selectCurrentDocumentState = createSelector(
  getDocumentEntitiesState,
  selectCurrentDocumentIdState,
  (entities, id) => entities[id]
);

export const selectIdRangeHighState = createSelector(
  getDocumentState,
  fromDocument.selectDocumentIdsRangeHigh
);

export const selectIdRangeLowState = createSelector(
  getDocumentState,
  fromDocument.selectDocumentIdsRangeLow
);

export const getDocumentByIdSeletor = (id: number) => {
  return createSelector(getDocumentEntitiesState, entities => entities[id]);
};
