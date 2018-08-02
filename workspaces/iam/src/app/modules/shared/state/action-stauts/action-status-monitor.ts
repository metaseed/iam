import { catchError, tap, map } from 'rxjs/operators';
import { OperatorFunction } from 'rxjs';
import { Store, Action } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { ActionStatus, CorrelationAction, ActionState, ActionStatusState } from './action-status';

export const SET_ACTION_STATUS_ACTION_TYPE = '[StatusMonitor] Set Action Status';

export class SetActionStatusAction implements Action {
  readonly type = SET_ACTION_STATUS_ACTION_TYPE;
  constructor(public payload: ActionStatus) {}
}

@Injectable()
export class ActionStatusMoniter {
  constructor(private store: Store<ActionStatusState>, private actions$: Actions) {}

  complete(action: CorrelationAction) {
    return tap(undefined, undefined, () => this._sendComplete(action));
  }

  private _sendComplete(action: CorrelationAction) {
    const coId = action.coId;
    console.groupCollapsed(`%c${action.type}-${coId}->complete`, 'background-color:#4285f4');
    console.count(`${action.type}-${coId}->complete`);
    console.groupEnd();
    this.store.dispatch(new SetActionStatusAction(new ActionStatus(ActionState.Complete, action)));
  }

  do$ = <T extends Action & { payload }>(actionType: string, pipe: OperatorFunction<T, any>) => {
    let coId: number;
    let action: CorrelationAction;
    return this.actions$.pipe(
      ofType<T>(actionType),
      tap((a: CorrelationAction) => {
        action = a;
        coId = action.coId;
        console.log(`%c${actionType}-${coId}->start`, 'background-color:#4285f4');

        this.store.dispatch(new SetActionStatusAction(new ActionStatus(ActionState.Start, action)));
      }),
      pipe,
      map(r => {
        const msg = new SetActionStatusAction(new ActionStatus(ActionState.Succession, action));

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
          new SetActionStatusAction(new ActionStatus(ActionState.Fail, action, err))
        );
        return caught;
      })
    );
  };
}