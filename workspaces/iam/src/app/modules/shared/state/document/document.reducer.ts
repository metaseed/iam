import { EntityState, EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';
import { Document, SearchResult } from 'core';
import { DocumentActions, DocumentActionType } from './document.actions';
import { selectCurrentDocumentIdState } from './document.selectors';
import { State } from '@ngrx/store';

export interface DocumentState extends EntityState<Document> {
  // additional entities state properties
  currentDocumentId: number;
  idRangeHigh: number; // undefined:initial, Number.MAX_VALUE highest number, no newest
  idRangeLow?: number; // undefined: lowest number, no oldest
  searchResult?: SearchResult;
}

export const adapter: EntityAdapter<Document> = createEntityAdapter<Document>({
  selectId: e => e.id,
  sortComparer: (a: Document, b: Document) =>
    a.metaData && b.metaData && a.metaData.updateDate.getTime() < b.metaData.updateDate.getTime()
      ? 1
      : -1
});

export const initialState: DocumentState = adapter.getInitialState({
  // additional entity state properties
  currentDocumentId: undefined,
  idRangeHigh: undefined
});
export function documentReducer(
  state: DocumentState = initialState,
  action: DocumentActions
): DocumentState {
  switch (action.type) {
    case DocumentActionType.AddDocument: {
      return adapter.addOne(action.payload.collectionDocument, state);
    }

    case DocumentActionType.UpsertDocument: {
      return adapter.upsertOne(action.payload.collectionDocument, state);
    }

    case DocumentActionType.AddDocuments: {
      return adapter.addMany(action.payload.collectionDocuments, state);
    }

    case DocumentActionType.UpsertDocuments: {
      return adapter.upsertMany(action.payload.collectionDocuments, state);
    }

    case DocumentActionType.UpdateDocument: {
      return adapter.updateOne(action.payload.collectionDocument, state);
    }

    case DocumentActionType.UpdateCurrentDocumentStatus: {
      let collectionDocument: Update<Document> = {
        id: state.currentDocumentId,
        changes: { documentStatus: action.payload }
      };

      return adapter.updateOne(collectionDocument, state);
    }

    case DocumentActionType.UpdateDocuments: {
      return adapter.updateMany(action.payload.collectionDocuments, state);
    }

    case DocumentActionType.DeleteDocument: {
      return adapter.removeOne(action.payload.id, state);
    }

    case DocumentActionType.DeleteDocuments: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case DocumentActionType.LoadDocuments: {
      return adapter.addMany(action.payload.collectionDocuments, state);
    }

    case DocumentActionType.ClearDocuments: {
      return adapter.removeAll(state);
    }
    case DocumentActionType.SetCurrentDocumentId: {
      return { ...state, currentDocumentId: action.payload.id };
    }

    case DocumentActionType.SetIdRangeHigh: {
      return { ...state, ...action.payload };
    }

    case DocumentActionType.SetIdRangeLow: {
      return { ...state, ...action.payload };
    }

    case DocumentActionType.SetSearchResult: {
      return { ...state, ...action.payload };
    }

    default: {
      return state;
    }
  }
}

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

export const getCurrentDocumentId = (state: DocumentState) => state.currentDocumentId;
export const getDocumentIdsRangeLow = (state: DocumentState) => state.idRangeLow;
export const getDocumentIdsRangeHigh = (state: DocumentState) => state.idRangeHigh;
