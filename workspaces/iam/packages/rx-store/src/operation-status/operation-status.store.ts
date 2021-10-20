import { filter, Observable, OperatorFunction } from "rxjs";
import { StateSubject, timeOutMonitor } from "../core";

export enum OperationStep {
  Start = 'Start',
  Continue = 'Continue',
  Error = 'Error',
  Complete = 'Complete',
  Timeout = 'Timeout'
}

export class OperationStatus {
  constructor(
    public type: string,
    /**
     * correlation Id, should be the same during lifetime of the operation.
     * used to differentiate operations of the same type
     */
    public coId: number,
    public step: OperationStep,
    public context?: any
  ) { }

  get id() {
    return `${this.type}-${this.coId}`;
  }

  isNotStartStatus() {
    return this.step !== OperationStep.Start;
  }

  isEndStatus() {
    return this.step === OperationStep.Complete ||
      this.step === OperationStep.Error ||
      this.step === OperationStep.Timeout;
  }
}

/**
 * operation is a sequence steps of computation.
 * it's process step: start, continue1, continue2,..., complete/fail/timeout
 *
 * we choose the name 'operation' vs. 'action'. in normal store the action is actually message,
 * this is more related to the computation inside the reducer, we give it a name operation.
 * so the normal store uses action to trigger operation in reducer to modify state of store.
 *
 */
export class OperationStatusStore {
  all_ = new StateSubject<OperationStatus>();

  start$ = this.all_.pipe(
    ofStep(OperationStep.Start)
  );

  continue$ = this.all_.pipe(
    ofStep(OperationStep.Continue)
  );

  complete$ = this.all_.pipe(
    ofStep(OperationStep.Complete)
  );

  error$ = this.all_.pipe(
    ofStep(OperationStep.Error)
  );

  timeOut$ = this.all_.pipe(
    ofStep(OperationStep.Timeout)
  );

}

export function ofType(...allowedType: string[]) {
  return filter((status: OperationStatus) => {
    return status && allowedType.some(t => t === status.type);
  });
}

export function ofStep(...monitoredSteps: string[]) {
  return filter<OperationStatus>(status => {
    return status && monitoredSteps.some(t => t === status.step);
  });
}

export function operationTimeout(
  type: string,
  timeoutMs: number,
  timeOutHandler: (start: OperationStatus) => void,
  sameOperationDiff?: (action: OperationStatus) => boolean
): OperatorFunction<OperationStatus, OperationStatus> {
  return (source: Observable<OperationStatus>) => source.pipe(
    ofType(type),
    timeOutMonitor<OperationStatus, OperationStatus>(
      timeoutMs,
      operationState =>
        operationState.step === OperationStep.Start &&
        (!sameOperationDiff ? true : sameOperationDiff(operationState)),
      (start, operationStatus) =>
        start &&
        operationStatus.coId === start.coId &&
        (!sameOperationDiff ? true : sameOperationDiff(operationStatus)) &&
        (operationStatus.step === OperationStep.Continue ||
          operationStatus.step === OperationStep.Error ||
          operationStatus.step === OperationStep.Complete),
      start => {
        if (timeOutHandler) timeOutHandler(start);
        return new OperationStatus(
          type,
          start.coId,
          OperationStep.Timeout
        );
      }
    )
  );
}
