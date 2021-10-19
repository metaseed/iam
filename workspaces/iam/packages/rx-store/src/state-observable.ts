import { Observable, shareReplay, Subscribable, tap } from "rxjs";
/**
 * Observable has a value property that stores the latest value from the observable
 */
export interface IStateObservable<T> extends Observable<T>{
  /**
   * get state: latest passed value;
   * undefined: if state is not set.
   */
  value: T | undefined

}


export function StateObservable<T>(source: Observable<T>): IStateObservable<T> {
  let replay = shareReplay<T>(1)(source);
  let state = tap<T>(o => (state as any).value = o)(replay);
  return state;
}
