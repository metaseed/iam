import { OperationState } from "./operation-state";

export interface OperationStatusReporter {
  setup(operationStatusStore: OperationState);
}
