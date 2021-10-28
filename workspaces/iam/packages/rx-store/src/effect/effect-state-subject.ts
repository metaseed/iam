import { OperatorFunction } from "rxjs";
import { SideEffect, StateSubject } from "../core";
import { MonitoredEffectOption, monitorSideEffect } from "./monitored-effect";
import { OperationState } from "./operation-state";
import { EffectStateObservable } from "./operators/effect-state-observable";

type MonitorEffect<T> = (monitoredEffect: (state: OperationState) => OperatorFunction<T, unknown>, option: MonitoredEffectOption) => EffectStateSubject<T>

export class EffectStateSubject<T> extends StateSubject<T> implements  Exclude<SideEffect<T>, EffectStateObservable<T>>  {
  operationStatus$ = new OperationState();

  addMonitoredEffect = monitorSideEffect.bind(this, this as any as EffectStateObservable<T>) as any as MonitorEffect<T>

}
