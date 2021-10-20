import { filter } from "rxjs";

export enum OperationStep {
  Start = 'Start',
  Continue = 'Continue',
  Error = 'Error',
  Complete = 'Complete',
  Timeout = 'Timeout'
}

export class OperationStatus {
  constructor(
    public type: string,
    /**
     * correlation Id, should be the same during lifetime of the operation.
     * used to differentiate operations of the same type
     */
    public coId: number,
    public step: OperationStep,
    public context?: any
  ) { }

  get id() {
    return `${this.type}-${this.coId}`;
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
