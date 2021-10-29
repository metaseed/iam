import { Observable, OperatorFunction, shareReplay, Subscribable, tap } from "rxjs";
import { EffectOption, sideEffect, SideEffect } from "./side-effect";
/**
 * Observable has a value property that stores the latest value from the observable
 */
export interface StateObservable<T> extends Observable<T>, SideEffect<T> {
  /**
   * get state: latest passed value;
   * undefined: if state is not set.
   */
  state: T | undefined;
  addEffect(effect: OperatorFunction<T, any>, options?: EffectOption): StateObservable<T>

}
// should not make it into an operator in pipe, because it return a StateObservable, otherwise need to
// explicitly as StateObservable<T>
export function state<T>(source: Observable<T>, hot = false): StateObservable<T> {
  const replay = shareReplay<T>(1)(source);
  const state = tap<T>(o => (state$ as any).state = o)(replay);
  const state$ = Object.create(state);
  state$.addEffect = sideEffect.bind(state$, state$);
  hot && state$.subscribe();
  return state$;
}
