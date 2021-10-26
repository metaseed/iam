import { mergeMap, of, OperatorFunction, pipe, tap } from "rxjs";
import { defaultEffectOption, EffectOption, sideEffect } from "../core";
import { getDefaultMonitoredEffectErrorOperator } from "../core/side-effect.internal";
import { OperationState } from "./operation-state";
import { OperationStatus, OperationStep } from "./operation-status";
import { MonitoredStateObservable } from "./monitored-state-observable";
import { operationTimeout } from "./operators/operation-timeout";

export interface MonitoredEffectOption extends EffectOption {
  type: string;
  effectState?: OperationState;
  /**
   * ms. if configured monitor the timeout status.
   */
  timeOut: number;
}

export function monitorSideEffect<T>(
  source: MonitoredStateObservable<T>,
  monitoredEffect: (status: OperationState) => OperatorFunction<T, unknown>,
  option: MonitoredEffectOption) {
  const options = { ...defaultEffectOption, ...option };
  let { type, effectState, timeOut } = options;

  if (!effectState) {
    effectState = source.operationState;
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
      let startStatus = new OperationStatus(type, OperationStep.Start);

      if (timeOut) {
        const timeoutSubscription = effectState!.pipe(
          tap(st => {
            if (st.isEndStatus() && st.coId === startStatus.coId) timeoutSubscription.unsubscribe();
          }),
          operationTimeout(type, timeOut, st => st.coId === startStatus.coId),
          tap(timeOutStatus => {
            effectState!.next(timeOutStatus);
          }))
          .subscribe();
      }

      effectState!.next(startStatus);

      return of(state).pipe(
        monitoredEffect(effectState!),
        getDefaultMonitoredEffectErrorOperator((state, context) => {
          const st = state === 'Error' ? startStatus.Error.with(context) :
            state === 'Retry' ? startStatus.Retry :
              state === 'Fail' ? startStatus.Fail :
                undefined;
          if (st === undefined)
            throw Error('unexpected state reported from error handler of monitored side effect.');
          effectState!.next(st);
        }),
      );

    })

  );

  return sideEffect(source, effect, options);
}