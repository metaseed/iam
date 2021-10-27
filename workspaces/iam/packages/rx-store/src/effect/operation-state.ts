import { StateSubject } from "../core";
import { OperationStatusReporter } from "./operation-status-reporter.interface";
import { ofStep, OperationStatus, OperationStep } from "./operation-status";

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

  ofStep(step: OperationStep) {
    return ofStep(step)(this);
  }

  /**
   * send `success` step to this OperationState
   * @param context
   */
  success(context?: any) {
    if (!this.state) throw Error('OperationState.success: no earlier state to use to generate Complete state')

    this.next(this.state.Success.with(context));
  }

}
