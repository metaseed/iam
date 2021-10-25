import { OperatorFunction } from "rxjs";
import { SideEffect, StateSubject } from "../core";
import { MonitoredEffectOption, monitorSideEffect } from "./monitored-effect";
import { OperationState } from "./operation-state";
import { OperationStatus } from "./operation-status";
import { OperationStatusObservable } from "./operation-status-observable";

type MonitorEffect<T> = (monitoredEffect: (status: OperationStatus) => OperatorFunction<T, unknown>, option: MonitoredEffectOption) => OperationStatusStateSubject<T>

export class OperationStatusStateSubject<T> extends StateSubject<T> implements  Exclude<SideEffect<T>, OperationStatusObservable<T>>  {
  operationState: OperationState | undefined;

  addMonitoredEffect = monitorSideEffect.bind(this, this as any as OperationStatusObservable<T>) as any as MonitorEffect<T>

}
