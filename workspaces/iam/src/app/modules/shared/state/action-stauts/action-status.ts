import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
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
  timeoutMs: number,
  timeOutHandler: (start: ActionStatus) => void,
  sameActionTypeDiff?: (action: ActionStatus) => boolean
): Observable<ActionStatus> {
  return actionStatusState$(store, actionType).pipe(
    timeOutMonitor<ActionStatus, ActionStatus>(
      timeoutMs,
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
        if (timeOutHandler) timeOutHandler(start);
        return new ActionStatus(
          ActionState.Timeout,
          start.action,
          `Timeout when perform ${start.action}`
        );
      }
    )
  );
}
