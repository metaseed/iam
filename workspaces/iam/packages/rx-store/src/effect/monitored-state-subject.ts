import { OperatorFunction } from "rxjs";
import { SideEffect, StateSubject } from "../core";
import { MonitoredEffectOption, monitorSideEffect } from "./monitored-effect";
import { OperationState } from "./operation-state";
import { OperationStatus } from "./operation-status";
import { MonitoredStateObservable } from "./monitored-state-observable";

type MonitorEffect<T> = (monitoredEffect: (status: OperationStatus) => OperatorFunction<T, unknown>, option: MonitoredEffectOption) => OperationStateSubject<T>

export class OperationStateSubject<T> extends StateSubject<T> implements  Exclude<SideEffect<T>, MonitoredStateObservable<T>>  {
  operationState = new OperationState();

  addMonitoredEffect = monitorSideEffect.bind(this, this as any as MonitoredStateObservable<T>) as any as MonitorEffect<T>

}
