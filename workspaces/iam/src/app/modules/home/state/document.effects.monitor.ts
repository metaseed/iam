import { catchError, tap, map } from 'rxjs/operators';
import { OperatorFunction } from 'rxjs';
import { Store, Action } from '@ngrx/store';
import { State } from './document.reducer';
import { Actions, ofType } from '@ngrx/effects';
import {
  DocumentEffectsActionTypes,
  ActionStatus,
  DocumentEffectionsAction
} from './document.effects.actions';
import { SetDocumentsMessage } from './document.actions';
import { Injectable } from '@angular/core';

@Injectable()
export class EffectsMoniter {
  constructor(private store: Store<State>, private actions$: Actions) {}

  complete(actionType: DocumentEffectsActionTypes, action: DocumentEffectionsAction) {
    return tap(undefined, undefined, () => this._sendComplete(actionType, action));
  }

  private _sendComplete(actionType: DocumentEffectsActionTypes, action: DocumentEffectionsAction) {
    const coId = action.coId;
    console.groupCollapsed(`%c${actionType}-${coId}->complete`, 'background-color:#4285f4');
    console.count(`${actionType}-${coId}->complete`);
    console.groupEnd();
    this.store.dispatch(
      new SetDocumentsMessage({
        action: actionType,
        status: ActionStatus.Complete,
        corelationId: coId
      })
    );
  }

  do = <T extends Action & { payload }>(
    actionType: DocumentEffectsActionTypes,
    pipe: OperatorFunction<T, any>
  ) => {
    let coId: number;
    return this.actions$.pipe(
      ofType<T>(actionType),
      tap((action: DocumentEffectionsAction) => {
        coId = action.coId;
        console.log(`%c${actionType}-${coId}->start`, 'background-color:#4285f4');

        this.store.dispatch(
          new SetDocumentsMessage({
            action: actionType,
            status: ActionStatus.Start,
            corelationId: coId
          })
        );
      }),
      pipe,
      map(r => {
        if (!r) {
          console.groupCollapsed(`%c${actionType}-${coId}->waiting`, 'background-color:#4285f433');
          console.count(`${actionType}-${coId}->waiting`);
          console.log('result:', r);
          console.groupEnd();
          return new SetDocumentsMessage({
            action: actionType,
            status: ActionStatus.Waiting,
            corelationId: coId
          });
        }
        const msg = new SetDocumentsMessage({
          action: actionType,
          status: ActionStatus.Succession,
          corelationId: coId
        });
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
          new SetDocumentsMessage({
            status: ActionStatus.Fail,
            action: actionType,
            corelationId: coId,
            message: err.message + err.stack
          })
        );
        return caught;
      })
    );
  };
}
