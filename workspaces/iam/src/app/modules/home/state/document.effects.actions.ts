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
export class ActionStatusInfo {
  constructor(
    public status: ActionStatus,
    public action: CorrelationAction,
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
): Observable<ActionStatusInfo> {
  return store.pipe(
    select(selectDocumentActionStatusState),
    ofActionType(action)
  );
}

export function monitorActionStatus(
  actionType: DocumentEffectsActionTypes,
  store: Store<State>,
  due: number,
  timeOutHander: (start: ActionStatusInfo) => void,
  sameActionTypeDiff?: (action: ActionStatusInfo) => boolean
): Observable<ActionStatusInfo> {
  return store.pipe(
    select(selectDocumentActionStatusState),
    ofActionType(actionType),
    timeOutMonitor<ActionStatusInfo, ActionStatusInfo>(
      due,

      actionStatus =>
        actionStatus.status === ActionStatus.Start &&
        (!sameActionTypeDiff ? true : sameActionTypeDiff(actionStatus)),

      (start, actionStatus) =>
        start &&
        actionStatus.action.coId === start.action.coId &&
        (!sameActionTypeDiff ? true : sameActionTypeDiff(actionStatus)) &&
        (actionStatus.status === ActionStatus.Succession ||
          actionStatus.status === ActionStatus.Fail ||
          actionStatus.status === ActionStatus.Complete),

      start => {
        if (timeOutHander) timeOutHander(start);
        return new ActionStatusInfo(
          ActionStatus.Timeout,
          start.action,
          `Timeout when perform ${start.action}`
        );
      }
    )
  );
}

export function ofActionType(actionType: DocumentEffectsActionTypes) {
  return filter((status: ActionStatusInfo) => {
    return status && status.action.type === actionType;
  });
}

export type DocumentEffectsActions =
  | DocumentEffectsReadBulkDocMeta
  | DocumentEffectsDelete
  | DocumentEffectsCreate
  | DocumentEffectsSave
  | DocumentEffectsRead;
