import { Observer, OperatorFunction, pipe, tap } from "rxjs";

export interface IOperatorStatusReporter<T> extends Observer<T> {
  subscribe: () => void;
  unsubscribe: () => void;
  finalize: () => void;
}

export class OperatorMonitor<T> {
  constructor(private reporter: Partial<IOperatorStatusReporter<T>>) { }

  monitor(operator: OperatorFunction<T, any>) {
      return pipe(tap(this.reporter), operator, tap(this.reporter))
  }
}
