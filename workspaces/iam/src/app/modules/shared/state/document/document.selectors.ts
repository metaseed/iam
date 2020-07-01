import { createSelector } from '@ngrx/store';
import * as fromDocument from './document.reducer';
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

export const selectCurrentDocStatus = createSelector(
  selectCurrentDocumentState,
  state => state && state.documentStatus
);

export const selectCurrentDocStatus_IsMemDirty = createSelector(
  selectCurrentDocStatus,
  status => status && status.isMemDirty
);

export const selectCurrentDocStatus_IsDbDirty = createSelector(
  selectCurrentDocStatus,
  status => status && status.isDbDirty
);

export const selectCurrentDocStatus_IsSyncing = createSelector(
  selectCurrentDocStatus,
  status => status && status.isSyncing
);

export const selectIdRangeHighState = createSelector(
  selectDocumentState,
  fromDocument.getDocumentIdsRangeHigh
);

export const selectIdRangeLowState = createSelector(
  selectDocumentState,
  fromDocument.getDocumentIdsRangeLow
);

export const getDocumentByIdSelector = (id: number) => {
  return createSelector(
    selectDocumentEntitiesState,
    entities => entities[id]
  );
};

export const getDocumentsByIdsSelector = (ids: Array<number>) => {
  return createSelector(
    selectDocumentEntitiesState,
    entities => ids.map(id => entities[id])
  );
};
export const selectSearchResultState = createSelector(
  selectDocumentState,
  document => document.searchResult
);
