import { Action, Store, select } from '@ngrx/store';
import { Observable, TimeoutError, UnaryFunction, of, asyncScheduler } from 'rxjs';
import { State } from './document.reducer';
import { filter, timeout, map, catchError, tap } from 'rxjs/operators';
import { selectDocumentActionStatusState } from 'app/modules/home/state';
import { timeOutMonitor } from '../../core/operators';

export enum DocumentEffectsActionTypes {
  Load = '[DocumentEffects] Load',
  Delete = '[DocumentEffects] Delete',
  Show = '[DocumentEffects] Show',
  New = '[DocumentEffects] New',
  Save = '[DocumentEffects] Save'
}

export class DocumentEffectsLoad implements Action {
  readonly type = DocumentEffectsActionTypes.Load;
  constructor(public payload={isBelowRange:true}){}
}
export class DocumentEffectsDelete implements Action {
  readonly type = DocumentEffectsActionTypes.Delete;
  constructor(public payload: { key: number; title: string }) {}
}
export class DocumentEffectsNew implements Action {
  readonly type = DocumentEffectsActionTypes.New;
  constructor(public payload: { format: string }) {}
}
export class DocumentEffectsShow implements Action {
  readonly type = DocumentEffectsActionTypes.Show;
  constructor(public payload: { id: number; title?: string; format?: string }) {}
}
export class DocumentEffectsSave implements Action {
  readonly type = DocumentEffectsActionTypes.Save;
  constructor(public payload: { content: string; format?: string }) {}
}

export enum ActionStatus {
  Start = 'Start',
  Success = 'Success',
  Fail = 'Fail'
}
export interface DocumentActionStatus {
  status: ActionStatus;
  action: DocumentEffectsActionTypes;
  message?: string;
  context?: any;
  corelationId?: number;
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
        (v.status === ActionStatus.Success || v.status === ActionStatus.Fail),
      start => {
        if (timeOutHander) timeOutHander(new TimeoutError());
        return {
          status: ActionStatus.Fail,
          action: start.action,
          message: `Timeout when perform ${start.action}`
        };
      }
    )
  );
}

export function ofActionType(actionType: DocumentEffectsActionTypes) {
  return filter((status: DocumentActionStatus) => {
    return status && status.action === actionType;
  });
}

export type DocumentEffectsActions =
  | DocumentEffectsLoad
  | DocumentEffectsDelete
  | DocumentEffectsNew
  | DocumentEffectsSave
  | DocumentEffectsShow;
