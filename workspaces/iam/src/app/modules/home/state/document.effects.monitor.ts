import { catchError, tap, map } from 'rxjs/operators';
import { OperatorFunction } from 'rxjs';
import { Store, Action } from '@ngrx/store';
import { State } from './document.reducer';
import { Actions, ofType } from '@ngrx/effects';
import {
  DocumentEffectsActionTypes,
  ActionStatus,
  ActionStatusInfo
} from './document.effects.actions';
import { SetDocumentsMessage } from './document.actions';
import { Injectable } from '@angular/core';
import { CorrelationAction } from 'core';

@Injectable()
export class EffectsMoniter {
  constructor(private store: Store<State>, private actions$: Actions) {}

  complete(action: CorrelationAction) {
    return tap(undefined, undefined, () => this._sendComplete(action));
  }

  private _sendComplete(action: CorrelationAction) {
    const coId = action.coId;
    console.groupCollapsed(`%c${action.type}-${coId}->complete`, 'background-color:#4285f4');
    console.count(`${action.type}-${coId}->complete`);
    console.groupEnd();
    this.store.dispatch(
      new SetDocumentsMessage(new ActionStatusInfo(ActionStatus.Complete, action))
    );
  }

  do = <T extends Action & { payload }>(
    actionType: DocumentEffectsActionTypes,
    pipe: OperatorFunction<T, any>
  ) => {
    let coId: number;
    let action: CorrelationAction;
    return this.actions$.pipe(
      ofType<T>(actionType),
      tap((a: CorrelationAction) => {
        action = a;
        coId = action.coId;
        console.log(`%c${actionType}-${coId}->start`, 'background-color:#4285f4');

        this.store.dispatch(
          new SetDocumentsMessage(new ActionStatusInfo(ActionStatus.Start, action))
        );
      }),
      pipe,
      map(r => {
        const msg = new SetDocumentsMessage(new ActionStatusInfo(ActionStatus.Succession, action));

        console.groupCollapsed(`%c${actionType}-${coId}->succession`, 'background-color:#4285f4');
        console.count(`${actionType}-${coId}->succession`);
        console.log('result:', r);
        console.groupEnd();
        return msg;
      }),
      catchError((err, caught) => {
        console.log(`%c${actionType}-${coId}->error`, 'background-color:#4285f4');
        console.error(err);
        this.store.dispatch(
          new SetDocumentsMessage(new ActionStatusInfo(ActionStatus.Fail, action, err))
        );
        return caught;
      })
    );
  };
}
