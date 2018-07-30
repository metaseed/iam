import { Action, Store, select } from '@ngrx/store';
import { Observable, TimeoutError, UnaryFunction, of, asyncScheduler } from 'rxjs';
import { State } from './state-selectors';
import { filter, timeout, map, catchError, tap } from 'rxjs/operators';
import { timeOutMonitor } from '../../core/operators';
import { selectDocumentActionStatusState } from './state-selectors';
import { DocFormat, CorrelationAction } from 'core';

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

export enum ActionStatus {
  Start = 'Start',
  Succession = 'Succession',
  Fail = 'Fail',
  Complete = 'Complete',
  Timeout = 'Timeout'
}
export class DocumentActionStatus {
  constructor(
    public status: ActionStatus,
    public action: CorrelationAction,
    public corelationId?: number,
    public message?: string,
    public context?: any
  ) {}
  isNotStartStatus() {
    return status !== ActionStatus.Start;
  }
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
  actionType: DocumentEffectsActionTypes,
  store: Store<State>,
  due: number,
  timeOutHander: (start: DocumentActionStatus) => void,
  sameActionTypeDiff?: (action: DocumentActionStatus) => boolean
): Observable<DocumentActionStatus> {
  return store.pipe(
    select(selectDocumentActionStatusState),
    ofActionType(actionType),
    timeOutMonitor<DocumentActionStatus, DocumentActionStatus>(
      due,

      actionStatus =>
        actionStatus.status === ActionStatus.Start &&
        (!sameActionTypeDiff ? true : sameActionTypeDiff(actionStatus)),

      (start, actionStatus) =>
        start &&
        actionStatus.corelationId === start.corelationId &&
        (!sameActionTypeDiff ? true : sameActionTypeDiff(actionStatus)) &&
        (actionStatus.status === ActionStatus.Succession ||
          actionStatus.status === ActionStatus.Fail ||
          actionStatus.status === ActionStatus.Complete),

      start => {
        if (timeOutHander) timeOutHander(start);
        return new DocumentActionStatus(
          ActionStatus.Timeout,
          start.action,
          start.corelationId,
          `Timeout when perform ${start.action}`
        );
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
