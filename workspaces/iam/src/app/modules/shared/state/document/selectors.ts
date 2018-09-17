import { createSelector } from '@ngrx/store';
import * as fromDocument from './reducer';
import { selectDocumentState } from '../state';

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
