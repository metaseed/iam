import { catchError, mergeMap, Observable, of, OperatorFunction, pipe, tap } from "rxjs";
import { OperationStep } from ".";
import { defaultEffectOption, EffectOption, sideEffect } from "../core";
import { OperationState } from "./operation-state";
import { OperationStatus } from "./operation-status.model";

export interface MonitoredEffectOption extends EffectOption {
  effectName: string;
  operationState: OperationState;
}

export function monitorSideEffect<T>(
  source: Observable<T>,
  monitoredEffect: (status: OperationStatus) => OperatorFunction<T, unknown>,
  option: MonitoredEffectOption) {
  const options = { ...defaultEffectOption, ...option };
  const { effectName, operationState } = options;

  const effect = pipe(
    /**
     * to monitor the operation status for every state change,
     * we need to give a same correlationId for every OperationStatus triggered by this state change.
     *
     * there is a hard case, if there are async operation in the pipe,
     * that means before the last operation completes, new state change could happen.
     * this cause the overlapped operation status pairs.
     * If we store the coId(in status) in a parent cope of the status change.
     * it would be override by new operation status of the flowing state change.
     * except we require the user pass the status to next step with data in every operator, which is
     * not a good design.
     * So we have to store it in the scope just for the new state change.
     *
     * we use mergeMap to create a context scope for every state change.
     * the OperationStatus for this state change is stored in this scope.
     *
     * but it also means the `effect` pipe can not process result between state change.
     * there is a walk around, create a `Subject` and next result generated from different state change.
     * but we could not monitor operation following the Subject emit,
     * because it's merged from different state change, so coId tracing lost.
     *
     */
    mergeMap((state:T) => {
      let status = new OperationStatus(effectName, OperationStep.Start);
      operationState.next(status);

      return of(state).pipe(
        monitoredEffect(status),
        catchError(e => {
          operationState.next(status.Error.with(e));
          throw e;
        })
      );

    })

  );
  return sideEffect(source, effect, options);
}
