import { OperatorFunction, pipe, Subject, tap } from "rxjs";
import { TapObserver } from "rxjs/internal/operators/tap";

type IOperatorStatusReporter<T> = Partial<TapObserver<T>>
export function OperatorMonitor<T>(reporter: IOperatorStatusReporter<T>) {
  return tap(reporter);
}
