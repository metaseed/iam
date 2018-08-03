import { DocFormat } from 'core';
import { CorrelationAction } from '../action-stauts/actions';

export enum DocumentEffectsActionTypes {
  ReadBulkDocMeta = '[DocumentEffects] Load',
  Delete = '[DocumentEffects] Delete',
  ReadDocument = '[DocumentEffects] Show',
  Create = '[DocumentEffects] New',
  Save = '[DocumentEffects] Save'
}

export class DocumentEffectsReadBulkDocMeta extends CorrelationAction {
  readonly type = DocumentEffectsActionTypes.ReadBulkDocMeta;
  constructor(public payload = { isBelowRange: true }) {
    super();
  }
}
export class DocumentEffectsDelete extends CorrelationAction {
  readonly type = DocumentEffectsActionTypes.Delete;
  constructor(public payload: { id: number }) {
    super();
  }
}
export class DocumentEffectsCreate extends CorrelationAction {
  readonly type = DocumentEffectsActionTypes.Create;
  constructor(public payload: { format: DocFormat }) {
    super();
  }
}
export class DocumentEffectsRead extends CorrelationAction {
  readonly type = DocumentEffectsActionTypes.ReadDocument;
  constructor(public payload: { id: number; title?: string; format?: string }) {
    super();
  }
}
export class DocumentEffectsSave extends CorrelationAction {
  readonly type = DocumentEffectsActionTypes.Save;
  constructor(public payload: { content: string; format?: DocFormat }) {
    super();
  }
}

export type DocumentEffectsActions =
  | DocumentEffectsReadBulkDocMeta
  | DocumentEffectsDelete
  | DocumentEffectsCreate
  | DocumentEffectsSave
  | DocumentEffectsRead;
