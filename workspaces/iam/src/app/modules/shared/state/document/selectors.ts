import { createSelector } from '@ngrx/store';
import * as fromDocument from './reducer';
import { selectDocumentState } from '../state';

export const selectDocumentsState = createSelector(
  selectDocumentState,
  fromDocument.selectAll
);
export const selectDocumentEntitiesState = createSelector(
  selectDocumentState,
  fromDocument.selectEntities
);
export const selectCurrentDocumentIdState = createSelector(
  selectDocumentState,
  fromDocument.getCurrentDocumentId
);
export const selectCurrentDocumentState = createSelector(
  selectDocumentEntitiesState,
  selectCurrentDocumentIdState,
  (entities, id) => entities[id]
);

export const selectIdRangeHighState = createSelector(
  selectDocumentState,
  fromDocument.getDocumentIdsRangeHigh
);

export const selectIdRangeLowState = createSelector(
  selectDocumentState,
  fromDocument.getDocumentIdsRangeLow
);

export const getDocumentByIdSeletor = (id: number) => {
  return createSelector(
    selectDocumentEntitiesState,
    entities => entities[id]
  );
};

export const selectSearchResultState = createSelector(
  selectDocumentState,
  document => document.searchResult
);
