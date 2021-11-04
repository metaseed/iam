import { filter } from "rxjs";

export enum OperationStep {
  Start = 'Start',
  /**
   * middle steps
   */
  Continue = 'Continue',
  Error = 'Error',
  /**
   * retrying several times if error happens
   */
  Retry = 'Retry',

  // end steps
  /**
   * skip process this operation because of consecutive errors happens
   */
  Fail = 'Fail',
  Success = 'Success',
  Timeout = 'Timeout'
}

export class OperationStatus {

  private constructor(
    /**
     * name that identify the specific operation
     */
    public type: string,
    public step?: OperationStep,
    public context?: any,
    /**
     * default value: Date.now() when create the Start status.
     * correlation Id: the same during lifetime of the operation, used to differentiate operations of the same type
     */
    public coId?: number,
    /**
     * the state that trigger this operation, set at start step, and pass along the life time.
     */
    public trigger?: any) {
  }

  static Start(type: string, trigger?: any, context?: any) {
    return new OperationStatus(type, OperationStep.Start, context, Date.now(), trigger);
  }

  get Continue() {
    const status = this.clone()
    status.step = OperationStep.Continue;
    return status;
  }
  get Error() {
    const status = this.clone()
    status.step = OperationStep.Error;
    return status;
  }
  get Retry() {
    const status = this.clone()
    status.step = OperationStep.Retry;
    return status;
  }

  get Fail() {
    const status = this.clone()
    status.step = OperationStep.Fail;
    return status;
  }
  get Success() {
    const status = this.clone()
    status.step = OperationStep.Success;
    return status;
  }
  get Timeout() {
    const status = this.clone()
    status.step = OperationStep.Timeout;
    return status;
  }

  with(context?: any) {
    this.context = context;
    return this;
  }

  get id() {
    return `[${this.type}] - ${this.coId}`;
  }

  isNotStartStatus() {
    return this.step !== OperationStep.Start;
  }

  isEndStatus() {
    return this.isNoneTimeoutEndStatus() ||
      this.step === OperationStep.Timeout;
  }

  isNoneTimeoutEndStatus() {
    return this.step === OperationStep.Success ||
      this.step === OperationStep.Fail;
  }

  clone() {
    return new OperationStatus(this.type, this.step, this.context, this.coId, this.trigger);
  }

}

export function ofType(...allowedType: string[]) {
  return filter((status: OperationStatus) => {
    return status && allowedType.some(step => step === status.type);
  });
}

export function ofStep(...monitoredSteps: OperationStep[]) {
  return filter<OperationStatus>(status => {
    return status && monitoredSteps.some(step => step === status.step);
  });
}
