import { Action, Store, select } from '@ngrx/store';
import { Observable, TimeoutError, UnaryFunction, of, asyncScheduler } from 'rxjs';
import { State } from './document.reducer';
import { filter, timeout, map, catchError, tap } from 'rxjs/operators';
import { getDocumentActionStatusState } from 'app/modules/docs/state';
import { Content } from '../../../storage/github/model/content';

export enum DocumentEffectsActionTypes {
  Load = '[DocumentEffects] Load',
  Delete = '[DocumentEffects] Delete',
  Show = '[DocumentEffects] Show',
  New = '[DocumentEffects] New',
  Save = '[DocumentEffects] Save'
}

export class DocumentEffectsLoad implements Action {
  readonly type = DocumentEffectsActionTypes.Load;
}
export class DocumentEffectsDelete implements Action {
  readonly type = DocumentEffectsActionTypes.Delete;
  constructor(public payload: { number: number; title: string }) {}
}
export class DocumentEffectsNew implements Action {
  readonly type = DocumentEffectsActionTypes.New;
  constructor(public payload: { format: string }) {}
}
export class DocumentEffectsShow implements Action {
  readonly type = DocumentEffectsActionTypes.Show;
  constructor(public payload: { number: number; title?: string; format?: string }) {}
}
export class DocumentEffectsSave implements Action {
  readonly type = DocumentEffectsActionTypes.Save;
  constructor(public payload: { content: string; format?: string }) {}
}

export enum ActionStatus {
  Init = 'Init',
  Start = 'Start',
  Success = 'Success',
  Fail = 'Fail'
}
export interface DocumentActionStatus {
  status: ActionStatus;
  action: DocumentEffectsActionTypes;
  message?: string;
  context?: any;
  /// todo: add corelationId;
}

export function getActionStatus(
  action: DocumentEffectsActionTypes,
  store: Store<State>
): Observable<ActionStatus> {
  return store.pipe(
    select(getDocumentActionStatusState),
    ofActionType(action),
    map(msg => msg.status)
  );
}

// export function monitorActionStatus(
//   action: DocumentEffectsActionTypes,
//   store: Store<State>,
//   time: number,
//   timeOutHander: (err: TimeoutError) => void
// ):Observable<DocumentActionStatus> {
//   let startTime:number;
//   store.pipe(
//     select(getDocumentActionStatusState),
//     ofActionType(action),
//     map(status=>{
//       switch(status.status) {
//         case ActionStatus.Start:{
//           startTime = asyncScheduler.schedule.now();
//           setTimeout
//           break;
//         }
//         case ActionStatus.Fail: {

//         }
//       }
//       return status;
//     })
//   );
// }

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
