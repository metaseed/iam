import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Document } from 'core';
import { DocumentActions, DocumentActionTypes } from './document.actions';

export interface DocumentState extends EntityState<Document> {
  // additional entities state properties
  currentDocumentId: number;
  idRangeHigh: number; // undefined:initial, Number.MAX_VALUE highest number, no newest
  idRangeLow?: number; // undefined: lowest number, no oldest
}

export const adapter: EntityAdapter<Document> = createEntityAdapter<Document>({
  selectId: e => e.id,
  sortComparer: (a: Document, b: Document) =>
    a.metaData && a.metaData.updateDate.getTime() < b.metaData.updateDate.getTime() ? 1 : -1
});

export const initialState: DocumentState = adapter.getInitialState({
  // additional entity state properties
  currentDocumentId: undefined,
  idRangeHigh: undefined
});
export function documentReducer(state = initialState, action: DocumentActions): DocumentState {
  switch (action.type) {
    case DocumentActionTypes.AddDocument: {
      return adapter.addOne(action.payload.collectionDocument, state);
    }

    case DocumentActionTypes.UpsertDocument: {
      return adapter.upsertOne(action.payload.collectionDocument, state);
    }

    case DocumentActionTypes.AddDocuments: {
      return adapter.addMany(action.payload.collectionDocuments, state);
    }

    case DocumentActionTypes.UpsertDocuments: {
      return adapter.upsertMany(action.payload.collectionDocuments, state);
    }

    case DocumentActionTypes.UpdateDocument: {
      return adapter.updateOne(action.payload.collectionDocument, state);
    }

    case DocumentActionTypes.UpdateDocuments: {
      return adapter.updateMany(action.payload.collectionDocuments, state);
    }

    case DocumentActionTypes.DeleteDocument: {
      return adapter.removeOne(action.payload.id, state);
    }

    case DocumentActionTypes.DeleteDocuments: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case DocumentActionTypes.LoadDocuments: {
      return adapter.addAll(action.payload.collectionDocuments, state);
    }

    case DocumentActionTypes.ClearDocuments: {
      return adapter.removeAll(state);
    }
    case DocumentActionTypes.SetCurrentDocumentId: {
      return { ...state, currentDocumentId: action.payload.id };
    }

    case DocumentActionTypes.SetIdRangeHigh: {
      return { ...state, ...action.payload };
    }

    case DocumentActionTypes.SetIdRangeLow: {
      return { ...state, ...action.payload };
    }

    default: {
      return state;
    }
  }
}

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

export const selectCurrentDocumentId = (state: DocumentState) => state.currentDocumentId;
export const selectDocumentIdsRangeLow = (state: DocumentState) => state.idRangeLow;
export const selectDocumentIdsRangeHigh = (state: DocumentState) => state.idRangeHigh;