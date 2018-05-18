import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Document } from '../models/document';
import { CollectionDocumentActions, CollectionDocumentActionTypes } from './collection-document.actions';

export interface State extends EntityState<Document> {
  // additional entities state properties
  currentDocumentId: string;
  message?: {type: 'success'|'fail'|null, content: string};
}

export const adapter: EntityAdapter<Document> = createEntityAdapter<Document>({sortComparer: (a: Document, b: Document)=> a.updated_at <  b.updated_at?-1:1});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  currentDocumentId: null
});
export function reducer(
  state = initialState,
  action: CollectionDocumentActions
): State {
  switch (action.type) {
    case CollectionDocumentActionTypes.AddCollectionDocument: {
      return adapter.addOne(action.payload.collectionDocument, state);
    }

    case CollectionDocumentActionTypes.UpsertCollectionDocument: {
      return adapter.upsertOne(action.payload.collectionDocument, state);
    }

    case CollectionDocumentActionTypes.AddCollectionDocuments: {
      return adapter.addMany(action.payload.collectionDocuments, state);
    }

    case CollectionDocumentActionTypes.UpsertCollectionDocuments: {
      return adapter.upsertMany(action.payload.collectionDocuments, state);
    }

    case CollectionDocumentActionTypes.UpdateCollectionDocument: {
      return adapter.updateOne(action.payload.collectionDocument, state);
    }

    case CollectionDocumentActionTypes.UpdateCollectionDocuments: {
      return adapter.updateMany(action.payload.collectionDocuments, state);
    }

    case CollectionDocumentActionTypes.DeleteCollectionDocument: {
      return adapter.removeOne(action.payload.id, state);
    }

    case CollectionDocumentActionTypes.DeleteCollectionDocuments: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case CollectionDocumentActionTypes.LoadCollectionDocuments: {
      return adapter.addAll(action.payload.collectionDocuments, state);
    }

    case CollectionDocumentActionTypes.ClearCollectionDocuments: {
      return adapter.removeAll(state);
    }
    case CollectionDocumentActionTypes.SetCurrentDocumentId: {
      return { ...state, currentDocumentId: action.payload.id };
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();


export const selectCurrentDocumentId = (state: State) => state.currentDocumentId;
