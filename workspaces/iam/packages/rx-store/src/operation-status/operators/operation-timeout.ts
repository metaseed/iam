import { Observable, OperatorFunction } from "rxjs";
import { timeOutMonitor } from "../../core";
import { ofType, OperationStatus, OperationStep } from "../operation-status.model";

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
