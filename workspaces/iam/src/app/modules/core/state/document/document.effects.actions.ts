import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectActionStatusState } from '../action-stauts/selectors';
import {
  CorrelationAction,
  ActionStatus,
  monitorActionStatus$,
  ActionStatusState,
  actionStatus$
} from '../action-stauts';
import { DocFormat } from '../../model';

export enum DocumentEffectsActionTypes {
  ReadBulkDocMeta = '[DocumentEffects] Load',
  Delete = '[DocumentEffects] Delete',
  ReadDocument = '[DocumentEffects] Show',
  Create = '[DocumentEffects] New',
  Save = '[DocumentEffects] Save'
}

export class DocumentEffectsReadBulkDocMeta implements CorrelationAction {
  readonly type = DocumentEffectsActionTypes.ReadBulkDocMeta;
  coId = Date.now();
  constructor(public payload = { isBelowRange: true }) {}
}
export class DocumentEffectsDelete implements CorrelationAction {
  coId = Date.now();
  readonly type = DocumentEffectsActionTypes.Delete;
  constructor(public payload: { id: number }) {}
}
export class DocumentEffectsCreate implements CorrelationAction {
  coId = Date.now();
  readonly type = DocumentEffectsActionTypes.Create;
  constructor(public payload: { format: DocFormat }) {}
}
export class DocumentEffectsRead implements CorrelationAction {
  coId = Date.now();
  readonly type = DocumentEffectsActionTypes.ReadDocument;
  constructor(public payload: { id: number; title?: string; format?: string }) {}
}
export class DocumentEffectsSave implements CorrelationAction {
  coId = Date.now();
  readonly type = DocumentEffectsActionTypes.Save;
  constructor(public payload: { content: string; format?: DocFormat }) {}
}

export function monitorDocumentActionStatus(
  actionType: string,
  store: Store<any>,
  due: number,
  timeOutHander: (start: ActionStatus) => void,
  sameActionTypeDiff?: (action: ActionStatus) => boolean
): Observable<ActionStatus> {
  return monitorActionStatus$(store, actionType, due, timeOutHander, sameActionTypeDiff);
}

export function getDocumentActionStatus$(
  action: DocumentEffectsActionTypes,
  store: Store<ActionStatusState>
) {
  return actionStatus$(store, action);
}

export type DocumentEffectsActions =
  | DocumentEffectsReadBulkDocMeta
  | DocumentEffectsDelete
  | DocumentEffectsCreate
  | DocumentEffectsSave
  | DocumentEffectsRead;
