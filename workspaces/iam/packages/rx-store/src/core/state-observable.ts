import { Observable, OperatorFunction, shareReplay, Subscribable, Subscription, tap } from "rxjs";
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
  /**
   * by default a stateObservable is hot, it stores the subscription that make it hot.
   *
   * not available on StateSubject
   */
  subscription?: Subscription;
}
// should not make it into an operator in pipe, because it return a StateObservable, otherwise need to
// explicitly as StateObservable<T>
export function state<T>(source: Observable<T>, cold = false): StateObservable<T> {
  source.subscribe
  const replay = shareReplay<T>(1)(source);
  const state$ = Object.create(tap<T>(o => (state$ as any).state = o)(replay));
  state$.addEffect = sideEffect.bind(state$, state$);
  if(!cold) state$.subscription = state$.subscribe();
  return state$;
}
