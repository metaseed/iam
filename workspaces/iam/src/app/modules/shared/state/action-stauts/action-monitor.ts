import { Injectable } from '@angular/core';
import { OperatorFunction } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Store, Action } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { ActionMonitorState } from './reducer';
import { CorrelationAction, SetActionStatusAction, ActionStatus, ActionState } from './actions';

@Injectable({ providedIn: 'root' })
export class ActionMoniter {
  constructor(private store: Store<ActionMonitorState>, private actions$: Actions) {}

  // call this function when inner observable complete to monitor the completion of the action
  complete(action: CorrelationAction) {
    return tap(undefined, undefined, () => {
      const coId = action.coId;
      console.groupCollapsed(`%c${action.type}-${coId}->complete`, 'background-color:#4285f4');
      console.count(`${action.type}-${coId}->complete`);
      console.groupEnd();
      this.store.dispatch(
        new SetActionStatusAction(new ActionStatus(ActionState.Complete, action))
      );
    });
  }

  do$ = <T extends CorrelationAction>(actionType: string, pipe: OperatorFunction<T, any>) => {
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
