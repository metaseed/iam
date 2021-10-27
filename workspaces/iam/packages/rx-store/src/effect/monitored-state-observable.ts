import { Observable, OperatorFunction } from "rxjs";
import { state, StateObservable } from "../core";
import { MonitoredEffectOption, monitorSideEffect } from "./monitored-effect";
import { OperationState } from "./operation-state";
import { OperationStatus } from "./operation-status";

type MonitorEffect<T> = (monitoredEffect: (status: OperationStatus) => OperatorFunction<T, unknown>, option: MonitoredEffectOption) => MonitoredStateObservable<T>;

export interface MonitoredStateObservable<T> extends StateObservable<T> {
  operationStatus$: OperationState;
  addMonitoredEffect: MonitorEffect<T>;
}

export function monitoredState<T>(source: Observable<T>): MonitoredStateObservable<T> {
  const state$ = state(source) as MonitoredStateObservable<T>;
  state$.operationStatus$= new OperationState();
  state$.addMonitoredEffect = monitorSideEffect.bind(state$, state$) as unknown as MonitorEffect<T>;
  return state$;
}
