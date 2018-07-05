import { Action, Store, select } from '@ngrx/store';
import { Observable, TimeoutError, UnaryFunction, of, asyncScheduler } from 'rxjs';
import { State } from './state-selectors';
import { filter, timeout, map, catchError, tap } from 'rxjs/operators';
import { timeOutMonitor } from '../../core/operators';
import { selectDocumentActionStatusState } from './state-selectors';
import { DocFormat } from 'core';

export enum DocumentEffectsActionTypes {
  ReadBulkDocMeta = '[DocumentEffects] Load',
  Delete = '[DocumentEffects] Delete',
  ReadDocument = '[DocumentEffects] Show',
  Create = '[DocumentEffects] New',
  Save = '[DocumentEffects] Save'
}

export interface DocumentEffectsAction extends Action {
  coId: number;
  payload: any;
}

export class DocumentEffectsReadBulkDocMeta implements DocumentEffectsAction {
  readonly type = DocumentEffectsActionTypes.ReadBulkDocMeta;
  coId = Date.now();
  constructor(public payload = { isBelowRange: true }) {}
}
export class DocumentEffectsDelete implements DocumentEffectsAction {
  coId = Date.now();
  readonly type = DocumentEffectsActionTypes.Delete;
  constructor(public payload: { id: number }) {}
}
export class DocumentEffectsCreate implements DocumentEffectsAction {
  coId = Date.now();
  readonly type = DocumentEffectsActionTypes.Create;
  constructor(public payload: { format: DocFormat }) {}
}
export class DocumentEffectsRead implements DocumentEffectsAction {
  coId = Date.now();
  readonly type = DocumentEffectsActionTypes.ReadDocument;
  constructor(public payload: { id: number; title?: string; format?: string }) {}
}
export class DocumentEffectsSave implements DocumentEffectsAction {
  coId = Date.now();
  readonly type = DocumentEffectsActionTypes.Save;
  constructor(public payload: { content: string; format?: DocFormat }) {}
}

export enum ActionStatus {
  Start = 'Start',
  Waiting = 'Waiting',
  Succession = 'Success',
  Fail = 'Fail',
  Complete = 'Complete',
  Timeout = 'Timeout'
}
export class DocumentActionStatus {
  constructor(
    public status: ActionStatus,
    public action: DocumentEffectsAction,
    public message?: string,
    public context?: any,
    public corelationId?: number
  ) {}
}

export function getActionStatus(
  action: DocumentEffectsActionTypes,
  store: Store<State>
): Observable<DocumentActionStatus> {
  return store.pipe(
    select(selectDocumentActionStatusState),
    ofActionType(action)
  );
}

export function monitorActionStatus(
  action: DocumentEffectsActionTypes,
  store: Store<State>,
  due: number,
  timeOutHander: (err: TimeoutError) => void
): Observable<DocumentActionStatus> {
  return store.pipe(
    select(selectDocumentActionStatusState),
    ofActionType(action),
    timeOutMonitor<DocumentActionStatus, DocumentActionStatus>(
      due,
      v => v.status === ActionStatus.Start,
      (start, v) =>
        start &&
        v.corelationId === start.corelationId &&
        (v.status === ActionStatus.Succession ||
          v.status === ActionStatus.Fail ||
          v.status === ActionStatus.Complete),
      start => {
        if (timeOutHander) timeOutHander(new TimeoutError());
        return {
          status: ActionStatus.Timeout,
          action: start.action,
          message: `Timeout when perform ${start.action}`
        };
      }
    )
  );
}

export function ofActionType(actionType: DocumentEffectsActionTypes) {
  return filter((status: DocumentActionStatus) => {
    return status && status.action.type === actionType;
  });
}

export type DocumentEffectsActions =
  | DocumentEffectsReadBulkDocMeta
  | DocumentEffectsDelete
  | DocumentEffectsCreate
  | DocumentEffectsSave
  | DocumentEffectsRead;
