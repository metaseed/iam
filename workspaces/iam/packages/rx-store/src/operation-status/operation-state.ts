import { StateSubject } from "../core";
import { OperationStatusReporter } from "./operation-status-reporter.interface";
import { ofStep, OperationStatus, OperationStep } from "./operation-status.model";

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

  addReporter(reporter: OperationStatusReporter){
    reporter.setup(this);
  }

  start$ = this.pipe(
    ofStep(OperationStep.Start)
  );

  continue$ = this.pipe(
    ofStep(OperationStep.Continue)
  );

  complete$ = this.pipe(
    ofStep(OperationStep.Complete)
  );

  error$ = this.pipe(
    ofStep(OperationStep.ErrorRetry)
  );

  timeOut$ = this.pipe(
    ofStep(OperationStep.Timeout)
  );

}
