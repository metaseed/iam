import { time } from "console";
import { mergeMap, Observable, of, OperatorFunction, pipe, Subscription, tap } from "rxjs";
import { operationTimeout } from ".";
import { defaultEffectOption, EffectOption, sideEffect } from "../core";
import { getDefaultMonitoredEffectErrorOperator } from "../core/side-effect.internal";
import { OperationState } from "./operation-state";
import { OperationStatus, OperationStep } from "./operation-status";
import { MonitoredStateObservable } from "./monitored-state-observable";

export interface MonitoredEffectOption extends EffectOption {
  effectName: string;
  operationState: OperationState;
  /**
   * ms. if configured monitor the timeout status.
   */
  timeOut: number;
}

export function monitorSideEffect<T>(
  source: MonitoredStateObservable<T>,
  monitoredEffect: (status: OperationStatus) => OperatorFunction<T, unknown>,
  option: MonitoredEffectOption) {
  const options = { ...defaultEffectOption, ...option };
  let { effectName, operationState, timeOut } = options;

  if (!operationState) {
    if (!source.operationState)
    source.operationState = new OperationState();
    operationState = source.operationState;
  }


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
    mergeMap((state: T) => {
      let startStatus = new OperationStatus(effectName, OperationStep.Start);

      if (timeOut) {
        const timeoutSubscription = operationState.pipe(
          tap(st => {
            if (st.isEndStatus() && st.coId === startStatus.coId) timeoutSubscription.unsubscribe();
          }),
          operationTimeout(effectName, timeOut, st => st.coId === startStatus.coId),
          tap(timeOutStatus => {
            operationState.next(timeOutStatus);
          }))
          .subscribe();
      }

      operationState.next(startStatus);

      return of(state).pipe(
        monitoredEffect(startStatus),
        getDefaultMonitoredEffectErrorOperator((state, context) => {
          const st = state === 'Error' ? startStatus.Error.with(context) :
            state === 'Retry' ? startStatus.Retry :
              state === 'Fail' ? startStatus.Fail :
                undefined;
          if (st === undefined)
            throw Error('unexpected state reported from error handler of monitored side effect.');
          operationState.next(st);
        }),
      );

    })

  );

  return sideEffect(source, effect, options);
}
