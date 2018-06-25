import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Document } from 'core';
import { DocumentActions, DocumentActionTypes} from './document.actions';
import {
  DocumentEffectsActionTypes,
  DocumentActionStatus,
  ActionStatus
} from './document.effects.actions';

export interface State extends EntityState<Document> {
  // additional entities state properties
  currentDocumentId: number;
  actionStatus?: DocumentActionStatus;
  keyRangeHigh: number; // undefined:initial, Number.MAX_VALUE highest number, no newest
  keyRangeLow?: number;  // undefined: lowest number, no oldest
}

export const adapter: EntityAdapter<Document> = createEntityAdapter<Document>({
  selectId: e => e.number,
  sortComparer: (a: Document, b: Document) =>
    a.metaData && a.metaData.updateDate < b.metaData.updateDate ? 1 : -1
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  currentDocumentId: undefined,
  keyRangeHigh:undefined
});
export function reducer(state = initialState, action: DocumentActions): State {
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

    case DocumentActionTypes.SetDocumentStatus: {
      return { ...state, actionStatus: action.payload };
    }
    case DocumentActionTypes.SetKeyRangeHigh: {
      return { ...state,  ...action.payload };
    }

    case DocumentActionTypes.SetKeyRangeLow: {
      return { ...state,  ...action.payload };
    }

    default: {
      return state;
    }
  }
}

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

export const selectCurrentDocumentId = (state: State) => state.currentDocumentId;
export const selectDocumentActionStatus = (state: State) => state.actionStatus;
export const selectDocumentsKeyRangeLow = (state: State) => state.keyRangeLow;
export const selectDocumentsKeyRangeHigh = (state: State) => state.keyRangeHigh;
