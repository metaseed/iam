import { Observable, tap } from "rxjs";

export type StateObservable<T> = Observable<T> & { value: T }

export function state<T>(getState: () => Observable<T>): StateObservable<T> {
  let state;
  return tap<T>(o => (state ?? getState() as any).value = o)  as unknown as StateObservable<T>;
}
