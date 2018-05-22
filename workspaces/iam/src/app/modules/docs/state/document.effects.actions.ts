import { Action, Store, select } from '@ngrx/store';
import { Observable, TimeoutError, UnaryFunction, of } from 'rxjs';
import { State } from './document.reducer';
import { filter, timeout, map, catchError, tap } from 'rxjs/operators';
import { getDocumentActionStatusState } from 'app/modules/docs/state';

export enum DocumentEffectsActionTypes {
  Load = '[DocumentEffects] Load',
  Delete = '[DocumentEffects] Delete',
  New = '[DocumentEffects] New',
  Save = '[DocumentEffects] Save'
}

export class DocumentEffectsLoad implements Action {
  readonly type = DocumentEffectsActionTypes.Load;
}
export class DocumentEffectsDelete implements Action {
  readonly type = DocumentEffectsActionTypes.Delete;
}
export class DocumentEffectsNew implements Action {
  readonly type = DocumentEffectsActionTypes.New;
}
export class DocumentEffectsSave implements Action {
  readonly type = DocumentEffectsActionTypes.Save;
}

export enum ActionStatus {
  Init='Init',
  Start='Start',
  Success='Success',
  Fail='Fail'
}
export interface DocumentActionStatus {
  status: ActionStatus;
  action: DocumentEffectsActionTypes;
  message?: string;
  context?: any;
}

export function getActionStatus(
  action: DocumentEffectsActionTypes,
  store: Store<State>,
  timeoutHandler?: (TimeoutError) => void
): Observable<boolean> {
  return store.pipe(
    select(getDocumentActionStatusState),
    filter(msg =>msg && msg.action === action),
    map(msg => msg.status === ActionStatus.Success),
    catchError((err: TimeoutError) => {
      if (timeoutHandler) timeoutHandler(err);
      return of(false);
    })
  );
}

export type DocumentEffectsActions =
  | DocumentEffectsLoad
  | DocumentEffectsDelete
  | DocumentEffectsNew
  | DocumentEffectsSave;
