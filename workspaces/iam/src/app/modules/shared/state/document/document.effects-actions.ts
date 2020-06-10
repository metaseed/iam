import { DocFormat } from 'core';
import { CorrelationAction } from '../action-stauts/actions';

export enum DocumentEffectsActionType {
  ReadBulkDocMeta = '[DocumentEffects] Load',
  Delete = '[DocumentEffects] Delete',
  ReadDocument = '[DocumentEffects] Show',
  Create = '[DocumentEffects] New',
  Save = '[DocumentEffects] Save',
  Search = '[DocumentEffects] Search'
}

export class DocumentEffectsReadBulkDocMeta extends CorrelationAction {
  readonly type = DocumentEffectsActionType.ReadBulkDocMeta;
  constructor(public payload = { isBelowRange: true }) {
    super();
  }
}
export class DocumentEffectsDelete extends CorrelationAction {
  readonly type = DocumentEffectsActionType.Delete;
  constructor(public payload: { id: number }) {
    super();
  }
}
export class DocumentEffectsCreate extends CorrelationAction {
  readonly type = DocumentEffectsActionType.Create;
  constructor(public payload: { format: DocFormat }) {
    super();
  }
}
export class DocumentEffectsRead extends CorrelationAction {
  readonly type = DocumentEffectsActionType.ReadDocument;
  constructor(public payload: { id: number; title?: string; format?: string }) {
    super();
  }
}
export class DocumentEffectsSave extends CorrelationAction {
  readonly type = DocumentEffectsActionType.Save;
  constructor(public payload: { content: string; format?: DocFormat; forceUpdate?: boolean }) {
    super();
  }
}

export class DocumentEffectsSearch extends CorrelationAction {
  readonly type = DocumentEffectsActionType.Search;
  constructor(public readonly payload: { query: string; folder?: string; extension?: string }) {
    super();
    payload.folder = payload.folder || 'documents';
    payload.extension = payload.extension || 'md';
  }
}

export type DocumentEffectsActions =
  | DocumentEffectsReadBulkDocMeta
  | DocumentEffectsDelete
  | DocumentEffectsCreate
  | DocumentEffectsSave
  | DocumentEffectsRead
  | DocumentEffectsSearch;
