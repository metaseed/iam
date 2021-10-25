import { StateObservable } from "../core";
import { OperationState } from "./operation-state";

export interface OperationStatusObservable<T> extends StateObservable<T> {
  operationState: OperationState;
}
