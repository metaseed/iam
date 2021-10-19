import { filter, Observable, OperatorFunction } from "rxjs";
import { StateSubject } from "./state-subject";

export enum OperationStatus {
  Start = 'Start',
  Succession = 'Succession',
  Fail = 'Fail',
  Complete = 'Complete',
  Timeout = 'Timeout'
}

export class OperationState {
  constructor(
    public type: string,
    public coId: number,
    public status: OperationStatus,
    public context?: any
  ) {}
  isNotStartStatus() {
    return this.status !== OperationStatus.Start;
  }
}

/**
 * operation is a sequence of observable operator piped through.
 */
export class OperationStateStore {
  operationState_ = new StateSubject<OperationState>();

}

export function ofType(...allowedType: string[]) {
  return filter((status: OperationState) => {
    return status && allowedType.some(t => t === status.type);
  });
}

export function monitorState(
  type: string,
  timeoutMs: number,
  timeOutHandler: (start: OperationState) => void,
  sameOperationDiff?: (action: OperationState) => boolean
): OperatorFunction<OperationState, OperationState>{
  return (source: Observable<OperationState>)=> source.pipe(
    ofType(type),
    timeOutMonitor<OperationState, OperationState>(
      timeoutMs,
      actionStatus =>
        actionStatus.state === ActionState.Start &&
        (!sameOperationDiff ? true : sameOperationDiff(actionStatus)),
      (start, actionStatus) =>
        start &&
        actionStatus.action.coId === start.action.coId &&
        (!sameOperationDiff ? true : sameOperationDiff(actionStatus)) &&
        (actionStatus.state === ActionState.Succession ||
          actionStatus.state === ActionState.Fail ||
          actionStatus.state === ActionState.Complete),
      start => {
        if (timeOutHandler) timeOutHandler(start);
        return new OperationState(
          ActionState.Timeout,
          start.action,
          `Timeout when perform ${start.action}`
        );
      }
    )
  );
}
