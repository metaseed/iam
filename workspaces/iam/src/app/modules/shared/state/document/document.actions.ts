import { Update } from '@ngrx/entity';
import { Document, SearchResult } from 'core';
import { IPayloadAction } from '../payload-action';
import { Action } from '@ngrx/store';
import { DocumentStatus } from 'app/modules/core/model/doc-model/doc-status';

export enum DocumentActionType {
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
  SetIdRangeHigh = '[Document] Set Key Range High',
  SetIdRangeLow = '[Document] Set Key Range Low',
  SetSearchResult = '[Document] Set Search Result',
  UpdateCurrentDocumentStatus = '[Document] Set Current Document Status'
}

export class LoadDocuments implements IPayloadAction {
  readonly type = DocumentActionType.LoadDocuments;

  constructor(public payload: { collectionDocuments: Document[] }) {}
}

export class AddDocument implements IPayloadAction {
  readonly type = DocumentActionType.AddDocument;

  constructor(public payload: { collectionDocument: Document }) {}
}

export class UpsertDocument implements IPayloadAction {
  readonly type = DocumentActionType.UpsertDocument;

  constructor(public payload: { collectionDocument: Document }) {}
}

export class AddDocuments implements IPayloadAction {
  readonly type = DocumentActionType.AddDocuments;

  constructor(public payload: { collectionDocuments: Document[] }) {}
}

export class UpsertDocuments implements IPayloadAction {
  readonly type = DocumentActionType.UpsertDocuments;

  constructor(public payload: { collectionDocuments: Document[] }) {}
}

export class UpdateDocument implements IPayloadAction {
  readonly type = DocumentActionType.UpdateDocument;

  constructor(public payload: { collectionDocument: Update<Document> }) {}
}

export class UpdateCurrentDocumentStatus implements IPayloadAction {
  readonly type = DocumentActionType.UpdateCurrentDocumentStatus;
  constructor(public payload: Partial<DocumentStatus>) {}
}

export class UpdateDocuments implements IPayloadAction {
  readonly type = DocumentActionType.UpdateDocuments;

  constructor(public payload: { collectionDocuments: Update<Document>[] }) {}
}

export class DeleteDocument implements IPayloadAction {
  readonly type = DocumentActionType.DeleteDocument;

  constructor(public payload: { id: number }) {}
}

export class DeleteDocuments implements IPayloadAction {
  readonly type = DocumentActionType.DeleteDocuments;

  constructor(public payload: { ids: number[] }) {}
}

export class ClearDocuments implements Action {
  readonly type = DocumentActionType.ClearDocuments;
}

export class SetCurrentDocumentId implements IPayloadAction {
  readonly type = DocumentActionType.SetCurrentDocumentId;
  constructor(public payload: { id: number }) {}
}

export class SetIdRangeHigh implements IPayloadAction {
  readonly type = DocumentActionType.SetIdRangeHigh;
  constructor(public payload: { idRangeHigh: number }) {}
}
export class SetIdRangeLow implements IPayloadAction {
  readonly type = DocumentActionType.SetIdRangeLow;
  constructor(public payload: { idRangeLow: number }) {}
}

export class SetSearchResultAction implements IPayloadAction {
  readonly type = DocumentActionType.SetSearchResult;
  constructor(public readonly payload: { searchResult: SearchResult }) {}
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
  | SetIdRangeHigh
  | SetIdRangeLow
  | UpdateCurrentDocumentStatus
  | SetSearchResultAction;
