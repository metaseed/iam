import { filter } from "rxjs";

export enum OperationStep {
  Start = 'Start',
  Continue = 'Continue',
  Retry = 'Retry',
  Error = 'Error',
  Complete = 'Complete',
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
     * could be used as correlation id if no overlapped status between start and end of different operations
     * correlation Id: the same during lifetime of the operation, used to differentiate operations of the same type
     */
    public coId?: number,
  ) {
    if (type === OperationStep.Start) this.coId = Date.now();
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
  get Complete() {
    return new OperationStatus(this.type, OperationStep.Complete, this.context, this.coId);
  }
  get Timeout() {
    return new OperationStatus(this.type, OperationStep.Timeout, this.context, this.coId);
  }
  get id(){
    return `[${this.type}] - ${this.coId}`;
  }
  with(context?: any) {
    return new OperationStatus(this.type, OperationStep.Timeout, context, this.coId);
  }

  isNotStartStatus() {
    return this.step !== OperationStep.Start;
  }

  isEndStatus() {
    return this.step === OperationStep.Complete ||
      this.step === OperationStep.Error ||
      this.step === OperationStep.Timeout;
  }
}


export function ofType(...allowedType: string[]) {
  return filter((status: OperationStatus) => {
    return status && allowedType.some(t => t === status.type);
  });
}

export function ofStep(...monitoredSteps: string[]) {
  return filter<OperationStatus>(status => {
    return status && monitoredSteps.some(t => t === status.step);
  });
}
