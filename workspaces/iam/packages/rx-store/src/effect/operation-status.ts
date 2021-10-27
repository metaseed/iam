import { filter } from "rxjs";

export enum OperationStep {
  Start = 'Start',

  // internal steps
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

  constructor(
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
    public trigger?: any,
  ) {
    if (step === OperationStep.Start) this.coId = Date.now();
  }

  get Start() {
    return new OperationStatus(this.type, OperationStep.Start, this.context);
  }

  get Continue() {
    return new OperationStatus(this.type, OperationStep.Continue, this.context, this.coId);
  }
  get Error() {
    return new OperationStatus(this.type, OperationStep.Error, this.context, this.coId);
  }
  get Retry() {
    return new OperationStatus(this.type, OperationStep.Retry, this.context, this.coId);
  }

  get Fail() {
    return new OperationStatus(this.type, OperationStep.Fail, this.context, this.coId);
  }
  get Success() {
    return new OperationStatus(this.type, OperationStep.Success, this.context, this.coId);
  }
  get Timeout() {
    return new OperationStatus(this.type, OperationStep.Timeout, this.context, this.coId);
  }

  with(context?: any) {
    return new OperationStatus(this.type, this.step, context, this.coId);
  }

  get id(){
    return `[${this.type}] - ${this.coId}`;
  }

  isNotStartStatus() {
    return this.step !== OperationStep.Start;
  }

  isEndStatus() {
    return this.isNoneTimeoutEndStatus() ||
      this.step === OperationStep.Timeout;
  }

  isNoneTimeoutEndStatus(){
    return this.step === OperationStep.Success ||
    this.step === OperationStep.Fail;
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
