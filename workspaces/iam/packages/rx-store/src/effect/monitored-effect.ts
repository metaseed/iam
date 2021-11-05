import { filter, mergeMap, of, OperatorFunction, pipe, tap } from "rxjs";
import { defaultEffectOption, EffectOption, sideEffect } from "../core";
import { OperationState } from "./operation-state";
import { OperationStatus, OperationStep } from "./operation-status";
import { EffectStateObservable } from "./effect-state-observable";
import { operationTimeout } from "./operators/operation-timeout";
import { getDefaultMonitoredEffectErrorOperator } from "./default-monitored-effect-error-operator";

export interface MonitoredEffectOption extends EffectOption {
  type: string;
  effectState?: OperationState;
  /**
   * ms. if configured monitor the timeout status.
   */
  timeOut?: number;

  timeOutHandler?: (timeOut: OperationStatus) => void
}

export class MonitoredEffectInfo {
  constructor(private operationState: OperationState, private startStatus: OperationStatus) {
  }
  /**
   * send `success` step to this OperationState
   * @param context
   */
  success(context?: any) {
    this.operationState.next(this.startStatus.Success.with(context));
  }
}

export function monitorSideEffect<T>(
  source: EffectStateObservable<T>,
  monitoredEffect: (status: MonitoredEffectInfo) => OperatorFunction<T, unknown>,
  option: MonitoredEffectOption) {
  const options = { ...defaultEffectOption, ...option };
  let { type, effectState: effectStatus, timeOut } = options;

  if (!effectStatus) {
    effectStatus = source.operationStatus$;
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
      const startStatus = OperationStatus.Start(type, state);
      if (timeOut) {
        const timeoutSubscription = effectStatus!.pipe(
          tap(st => {
            if (st.isEndStatus() && st.coId === startStatus.coId) timeoutSubscription.unsubscribe();
          }),
          operationTimeout(type, timeOut, st => st.coId === startStatus.coId),
          filter(status => status.step === OperationStep.Timeout),
          tap(timeOutStatus => {
            effectStatus!.next(timeOutStatus);
            options.timeOutHandler?.(timeOutStatus);
          }))
          .subscribe();
      }

      effectStatus!.next(startStatus);

      return of(state).pipe(
        monitoredEffect(new MonitoredEffectInfo(effectStatus!, startStatus)),
        getDefaultMonitoredEffectErrorOperator((sta, context) => {
          const st = sta === 'Error' ? startStatus.Error :
            sta === 'Retry' ? startStatus.Retry :
              sta === 'Fail' ? startStatus.Fail :
                undefined;
          if (st === undefined)
            throw Error('unexpected state reported from error handler of monitored side effect.');
          effectStatus!.next(st.with(context));
        }),
      );

    })

  );

  return sideEffect(source, effect, options);
}
