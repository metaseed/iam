import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Document, ActionStatus } from 'core';

export enum DocumentActionTypes {
  LoadDocuments = '[Document] Load Documents',
  AddDocument = '[Document] Add Document',
  UpsertDocument = '[Document] Upsert Document',
  AddDocuments = '[Document] Add Documents',
  UpsertDocuments = '[Document] Upsert Documents',
  UpdateDocument = '[Document] Update Document',
  UpdateDocuments = '[Document] Update Documents',
  DeleteDocument = '[Document] Delete Document',
  DeleteDocuments = '[Document] Delete Documents',
  ClearDocuments = '[Document] Clear Documents',
  SetCurrentDocumentId = '[Document] Set Current CollectoinDocument Id',
  SetDocumentStatus = '[Document] Set Status',
  SetIdRangeHigh = '[Document] Set Key Range High',
  SetIdRangeLow = '[Document] Set Key Range Low'
}

export class LoadDocuments implements Action {
  readonly type = DocumentActionTypes.LoadDocuments;

  constructor(public payload: { collectionDocuments: Document[] }) {}
}

export class AddDocument implements Action {
  readonly type = DocumentActionTypes.AddDocument;

  constructor(public payload: { collectionDocument: Document }) {}
}

export class UpsertDocument implements Action {
  readonly type = DocumentActionTypes.UpsertDocument;

  constructor(public payload: { collectionDocument: Document }) {}
}

export class AddDocuments implements Action {
  readonly type = DocumentActionTypes.AddDocuments;

  constructor(public payload: { collectionDocuments: Document[] }) {}
}

export class UpsertDocuments implements Action {
  readonly type = DocumentActionTypes.UpsertDocuments;

  constructor(public payload: { collectionDocuments: Document[] }) {}
}

export class UpdateDocument implements Action {
  readonly type = DocumentActionTypes.UpdateDocument;

  constructor(public payload: { collectionDocument: Update<Document> }) {}
}

export class UpdateDocuments implements Action {
  readonly type = DocumentActionTypes.UpdateDocuments;

  constructor(public payload: { collectionDocuments: Update<Document>[] }) {}
}

export class DeleteDocument implements Action {
  readonly type = DocumentActionTypes.DeleteDocument;

  constructor(public payload: { id: number }) {}
}

export class DeleteDocuments implements Action {
  readonly type = DocumentActionTypes.DeleteDocuments;

  constructor(public payload: { ids: number[] }) {}
}

export class ClearDocuments implements Action {
  readonly type = DocumentActionTypes.ClearDocuments;
}

export class SetCurrentDocumentId implements Action {
  readonly type = DocumentActionTypes.SetCurrentDocumentId;
  constructor(public payload: { id: number }) {}
}

export class SetDocumentsActionStatus implements Action {
  readonly type = DocumentActionTypes.SetDocumentStatus;
  constructor(public payload: ActionStatus) {}
}

export class SetIdRangeHigh implements Action {
  readonly type = DocumentActionTypes.SetIdRangeHigh;
  constructor(public payload: { idRangeHigh: number }) {}
}
export class SetIdRangeLow implements Action {
  readonly type = DocumentActionTypes.SetIdRangeLow;
  constructor(public payload: { idRangeLow: number }) {}
}

export type DocumentActions =
  | LoadDocuments
  | AddDocument
  | UpsertDocument
  | AddDocuments
  | UpsertDocuments
  | UpdateDocument
  | UpdateDocuments
  | DeleteDocument
  | DeleteDocuments
  | ClearDocuments
  | SetCurrentDocumentId
  | SetDocumentsActionStatus
  | SetIdRangeHigh
  | SetIdRangeLow;
