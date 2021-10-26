import { Observable, OperatorFunction } from "rxjs";
import { timeOutMonitor } from "../../core";
import { ofType, OperationStatus, OperationStep } from "../operation-status";

export function operationTimeout(
  type: string,
  timeoutMs: number,
  isStartOperation?: (status: OperationStatus) => boolean,
  isEndOperation?:(status: OperationStatus) => boolean,
  timeOutHandler?: (start: OperationStatus) => void,
): OperatorFunction<OperationStatus, OperationStatus> {

  return (source: Observable<OperationStatus>) => source.pipe(
    ofType(type),
    timeOutMonitor<OperationStatus, OperationStatus>(
      timeoutMs,

      operationStatus =>
        operationStatus.step === OperationStep.Start &&
        (!isStartOperation ? true : isStartOperation(operationStatus)),

      (start, operationStatus) =>
        start &&
        operationStatus.coId === start.coId &&
        (!isEndOperation ? true : isEndOperation(operationStatus)) &&
        operationStatus.isNoneTimeoutEndStatus(),

      start => {
        const timeOut = start.Timeout;
        if (timeOutHandler) timeOutHandler(timeOut);

        return timeOut;
      }
    )
  );
}
