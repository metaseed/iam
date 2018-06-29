import { catchError, tap, map } from 'rxjs/operators';
import { OperatorFunction } from 'rxjs';
import { Store, Action } from '@ngrx/store';
import { State } from './document.reducer';
import { Actions, ofType } from '@ngrx/effects';
import { DocumentEffectsActionTypes, ActionStatus } from './document.effects.actions';
import { SetDocumentsMessage } from './document.actions';
import { Injectable } from '@angular/core';

@Injectable()
export class EffectsMoniter {
  constructor(private store: Store<State>, private actions$: Actions) {}

  do = <T extends Action & { payload }>(
    action: DocumentEffectsActionTypes,
    pipe: OperatorFunction<T, any>
  ) => {
    let coId: number = -1;
    return this.actions$.pipe(
      ofType<T>(action),
      tap(_ => {
        console.log(`%c${action}-${coId}->start`,'background-color:#4285f4')
        this.store.dispatch(
          new SetDocumentsMessage({
            action,
            status: ActionStatus.Start,
            corelationId: (coId = Date.now())
          })
        )
      }
      ),
      pipe,
      map(r => {
        const msg = new SetDocumentsMessage({
          action,
          status: ActionStatus.Success,
          corelationId: coId
        });
        console.log(`%c${action}-${coId}->success`,'background-color:#4285f4')
        console.count(`${action}-${coId}->success`);
        console.log(r);
        return msg;
        // console.groupEnd()

      }),
      catchError((err, caught) => {
        console.log(`%c${action}-${coId}->error`,'background-color:#4285f4')
        console.error(err);
        this.store.dispatch(
          new SetDocumentsMessage({
            status: ActionStatus.Fail,
            action,
            corelationId: coId,
            message: err
          })
        );
        return caught;
      })
    );
  };
}
