import { StateSubject } from "../core";
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
export class OperationStatusStore {
  all_ = new StateSubject<OperationStatus>();

  start$ = this.all_.pipe(
    ofStep(OperationStep.Start)
  );

  continue$ = this.all_.pipe(
    ofStep(OperationStep.Continue)
  );

  complete$ = this.all_.pipe(
    ofStep(OperationStep.Complete)
  );

  error$ = this.all_.pipe(
    ofStep(OperationStep.Error)
  );

  timeOut$ = this.all_.pipe(
    ofStep(OperationStep.Timeout)
  );

}
