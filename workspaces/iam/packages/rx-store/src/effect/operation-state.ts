import { StateSubject } from "../core";
import { OperationStatusReporter } from "./operation-status-reporter.interface";
import { ofStep, ofType, OperationStatus, OperationStep } from "./operation-status";

/**
 * operation is a sequence steps of computation.
 * it's process step: start, continue1, continue2,..., complete/fail/timeout
 *
 * we choose the name 'operation' vs. 'action'. in normal store the action is actually message,
 * this is more related to the computation inside the reducer, we give it a name operation.
 * so the normal store uses action to trigger operation in reducer to modify state of store.
 *
 */
export class OperationState extends StateSubject<OperationStatus>{

  addReporter(reporter: OperationStatusReporter) {
    reporter.setup(this);
  }

  ofStep(...step: OperationStep[]) {
    return ofStep(...step)(this);
  }

  ofType(...type: string[]) {
    return ofType(...type)(this);
  }

}
