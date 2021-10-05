import { createSelector } from '@ngrx/store';
import * as fromDocument from './document.reducer';
import { selectDocumentState } from '../state';

export const selectDocuments = createSelector(
  selectDocumentState,
  fromDocument.selectAll
);
export const selectDocumentEntities = createSelector(
  selectDocumentState,
  fromDocument.selectEntities
);
export const selectCurrentDocumentId = createSelector(
  selectDocumentState,
  fromDocument.getCurrentDocumentId
);
export const selectCurrentDocument = createSelector(
  selectDocumentEntities,
  selectCurrentDocumentId,
  (entities, id) => entities[id]
);
export const selectCurrentDocumentContent = createSelector(
  selectCurrentDocument,
  doc => doc?.content
)
export const selectCurrentDocumentContentString = createSelector(
  selectCurrentDocumentContent,
  content => content?.content ?? ''
)
export const selectCurrentDocStatus = createSelector(
  selectCurrentDocument,
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

export const selectIdRangeHigh = createSelector(
  selectDocumentState,
  fromDocument.getDocumentIdsRangeHigh
);

export const selectIdRangeLow = createSelector(
  selectDocumentState,
  fromDocument.getDocumentIdsRangeLow
);

export const getDocumentByIdSelector = (id: number) => {
  return createSelector(
    selectDocumentEntities,
    entities => entities[id]
  );
};

export const getDocumentsByIdsSelector = (ids: Array<number>) => {
  return createSelector(
    selectDocumentEntities,
    entities => ids.map(id => entities[id])
  );
};
export const selectSearchResultState = createSelector(
  selectDocumentState,
  document => document.searchResult
);
