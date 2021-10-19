import { Observable, shareReplay, tap } from "rxjs";

export type StateObservable<T> = Observable<T> & {
/**
 * get state: last passed value;
 * undefined: if state is not set.
 */
  value: T | undefined
}

export function state<T>(source: Observable<T>): StateObservable<T> {
  let replay = shareReplay<T>(1)(source);
  let state = tap<T>(o => (state as any).value = o)(replay) as unknown as StateObservable<T>;
  return state;
}
