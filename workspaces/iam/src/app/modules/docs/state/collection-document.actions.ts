import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Document } from '../models/document';

export enum CollectionDocumentActionTypes {
  LoadCollectionDocuments = '[CollectionDocument] Load CollectionDocuments',
  AddCollectionDocument = '[CollectionDocument] Add CollectionDocument',
  UpsertCollectionDocument = '[CollectionDocument] Upsert CollectionDocument',
  AddCollectionDocuments = '[CollectionDocument] Add CollectionDocuments',
  UpsertCollectionDocuments = '[CollectionDocument] Upsert CollectionDocuments',
  UpdateCollectionDocument = '[CollectionDocument] Update CollectionDocument',
  UpdateCollectionDocuments = '[CollectionDocument] Update CollectionDocuments',
  DeleteCollectionDocument = '[CollectionDocument] Delete CollectionDocument',
  DeleteCollectionDocuments = '[CollectionDocument] Delete CollectionDocuments',
  ClearCollectionDocuments = '[CollectionDocument] Clear CollectionDocuments',
  SetCurrentDocumentId = '[CollectionDocument] Set Current CollectoinDocument Id'
}

export class LoadCollectionDocuments implements Action {
  readonly type = CollectionDocumentActionTypes.LoadCollectionDocuments;

  constructor(public payload: { collectionDocuments: Document[] }) {}
}

export class AddCollectionDocument implements Action {
  readonly type = CollectionDocumentActionTypes.AddCollectionDocument;

  constructor(public payload: { collectionDocument: Document }) {}
}

export class UpsertCollectionDocument implements Action {
  readonly type = CollectionDocumentActionTypes.UpsertCollectionDocument;

  constructor(public payload: { collectionDocument: Document }) {}
}

export class AddCollectionDocuments implements Action {
  readonly type = CollectionDocumentActionTypes.AddCollectionDocuments;

  constructor(public payload: { collectionDocuments: Document[] }) {}
}

export class UpsertCollectionDocuments implements Action {
  readonly type = CollectionDocumentActionTypes.UpsertCollectionDocuments;

  constructor(public payload: { collectionDocuments: Document[] }) {}
}

export class UpdateCollectionDocument implements Action {
  readonly type = CollectionDocumentActionTypes.UpdateCollectionDocument;

  constructor(public payload: { collectionDocument: Update<Document> }) {}
}

export class UpdateCollectionDocuments implements Action {
  readonly type = CollectionDocumentActionTypes.UpdateCollectionDocuments;

  constructor(public payload: { collectionDocuments: Update<Document>[] }) {}
}

export class DeleteCollectionDocument implements Action {
  readonly type = CollectionDocumentActionTypes.DeleteCollectionDocument;

  constructor(public payload: { id: string }) {}
}

export class DeleteCollectionDocuments implements Action {
  readonly type = CollectionDocumentActionTypes.DeleteCollectionDocuments;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearCollectionDocuments implements Action {
  readonly type = CollectionDocumentActionTypes.ClearCollectionDocuments;
}

export class SetCurrentDocumentId implements Action {
  readonly type = CollectionDocumentActionTypes.SetCurrentDocumentId;
  constructor(public payload: { id: string }) {}
}

export type CollectionDocumentActions =
 LoadCollectionDocuments
 | AddCollectionDocument
 | UpsertCollectionDocument
 | AddCollectionDocuments
 | UpsertCollectionDocuments
 | UpdateCollectionDocument
 | UpdateCollectionDocuments
 | DeleteCollectionDocument
 | DeleteCollectionDocuments
 | ClearCollectionDocuments
 | SetCurrentDocumentId;
