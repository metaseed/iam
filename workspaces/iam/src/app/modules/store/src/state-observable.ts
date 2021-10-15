import { Observable, tap } from "rxjs";

export type StateObservable<T> = Observable<T> & { value: T }

export function state<T>(source: Observable<T>): StateObservable<T> {
  let state = tap<T>(o => (state as any).value = o)(source) as unknown as StateObservable<T>;
  return state;
}
