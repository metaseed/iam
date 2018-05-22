import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Document } from '../models/document';
import { DocumentActions, DocumentActionTypes } from './document.actions';
import { DocumentEffectsActionTypes, DocumentActionStatus, ActionStatus } from './document.effects.actions';

export interface State extends EntityState<Document> {
  // additional entities state properties
  currentDocumentId: string;
  actionStatus?: DocumentActionStatus
}

export const adapter: EntityAdapter<Document> = createEntityAdapter<Document>({sortComparer: (a: Document, b: Document)=> a.updated_at <  b.updated_at?-1:1});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  currentDocumentId: null
});
export function reducer(
  state = initialState,
  action: DocumentActions
): State {
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
      const actionStatus = {action: DocumentEffectsActionTypes.Load, message:'documents loaded.', status: ActionStatus.Success}
      return adapter.addAll(action.payload.collectionDocuments, {...state,actionStatus});
    }

    case DocumentActionTypes.ClearDocuments: {
      return adapter.removeAll(state);
    }
    case DocumentActionTypes.SetCurrentDocumentId: {
      return { ...state, currentDocumentId: action.payload.id };
    }

    case DocumentActionTypes.SetDocumentsMessage: {
      return {...state, actionStatus:action.payload}
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
