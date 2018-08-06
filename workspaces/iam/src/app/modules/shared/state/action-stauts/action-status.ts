import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Store, MemoizedSelector, select } from '@ngrx/store';

import { getActionStatusState } from './selectors';
import { ActionStatus, ActionState } from './actions';
import { ActionMonitorState } from './reducer';
import { timeOutMonitor } from 'core';

export function ofActionType(...allowedActionType: string[]) {
  return filter((status: ActionStatus) => {
    return status && allowedActionType.some(t => t === status.action.type);
  });
}

export function actionStatusState$(
  store: Store<ActionMonitorState>,
  actionType: string
): Observable<ActionStatus> {
  return store.pipe(
    select(getActionStatusState),
    ofActionType(actionType)
  );
}

export function monitorActionStatus$(
  store: Store<any>,
  actionType: string,
  due: number, // time out time in ms
  timeOutHander: (start: ActionStatus) => void,
  sameActionTypeDiff?: (action: ActionStatus) => boolean
): Observable<ActionStatus> {
  return actionStatusState$(store, actionType).pipe(
    timeOutMonitor<ActionStatus, ActionStatus>(
      due,
      actionStatus =>
        actionStatus.state === ActionState.Start &&
        (!sameActionTypeDiff ? true : sameActionTypeDiff(actionStatus)),
      (start, actionStatus) =>
        start &&
        actionStatus.action.coId === start.action.coId &&
        (!sameActionTypeDiff ? true : sameActionTypeDiff(actionStatus)) &&
        (actionStatus.state === ActionState.Succession ||
          actionStatus.state === ActionState.Fail ||
          actionStatus.state === ActionState.Complete),
      start => {
        if (timeOutHander) timeOutHander(start);
        return new ActionStatus(
          ActionState.Timeout,
          start.action,
          `Timeout when perform ${start.action}`
        );
      }
    )
  );
}
