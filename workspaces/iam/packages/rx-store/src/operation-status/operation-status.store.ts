import { filter, Observable, OperatorFunction } from "rxjs";
import { timeOutMonitor } from "../operators/timeout-monitor";
import { StateSubject } from "../state-subject";

export enum OperationStep {
  Start = 'Start',
  Continue = 'Continue',
  Fail = 'Fail',
  Complete = 'Complete',
  Timeout = 'Timeout'
}

export class OperationStatus {
  constructor(
    public type: string,
    public coId: number,
    public step: OperationStep,
    public context?: any
  ) {}
  isNotStartStatus() {
    return this.step !== OperationStep.Start;
  }
}

/**
 * operation is a sequence steps of computation.
 * it's process step: start, continue1, continue2,..., complete/fail/timeout
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

  fail$ = this.all_.pipe(
    ofStep(OperationStep.Fail)
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
): OperatorFunction<OperationStatus, OperationStatus>{
  return (source: Observable<OperationStatus>)=> source.pipe(
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
          operationStatus.step === OperationStep.Fail ||
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
