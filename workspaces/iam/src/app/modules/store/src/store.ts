import { Observable, tap, BehaviorSubject } from "rxjs";

export type StateObservable<T> = Observable<T> & { value: T }

export class StateSubject<T> extends BehaviorSubject<T> {
  constructor(value?: T) {
    super(value as T);
  }
}

export function state<T>(source: Observable<T>): StateObservable<T> {
  let state = tap<T>(o => (state as any).value = o)(source) as unknown as StateObservable<T>;
  return state;
}
