import { Observable, OperatorFunction } from "rxjs";
import { state, StateObservable } from "../core";
import { MonitoredEffectOption, monitorSideEffect } from "./monitored-effect";
import { OperationState } from "./operation-state";
import { OperationStatus } from "./operation-status";

type MonitorEffect<T> = (monitoredEffect: (status: OperationStatus) => OperatorFunction<T, unknown>, option: MonitoredEffectOption) => EffectStateObservable<T>;

export interface EffectStateObservable<T> extends StateObservable<T> {
  operationStatus$: OperationState;
  addMonitoredEffect: MonitorEffect<T>;
}

export function effectState<T>(hot = false){
  return (source: Observable<T>): EffectStateObservable<T> => {
    const state$ = state(hot)(source) as EffectStateObservable<T>;
    state$.operationStatus$= new OperationState();
    state$.addMonitoredEffect = monitorSideEffect.bind(state$, state$) as unknown as MonitorEffect<T>;
    return state$;
  }
}
