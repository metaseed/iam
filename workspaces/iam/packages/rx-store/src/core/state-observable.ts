import { map as rxMap, Observable, OperatorFunction, shareReplay, Subscription, tap } from "rxjs";
import { EffectOption, SideEffect } from "./side-effect";
import { makeStateObservable } from "./state-observable.internal";
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
  operate: <O>(operator: OperatorFunction<T, O>) => StateObservable<O>;
  map: <O>(projector: (s: T) => O) => StateObservable<O>;
}
// should not make it into an operator in pipe, because it return a StateObservable, otherwise need to
// explicitly as StateObservable<T>
export function state<T>(source: Observable<T>, cold = false): StateObservable<T> {
  const replay = shareReplay<T>(1)(source);
  return makeStateObservable(replay, cold);
}

export type Operate = <T, O>(source: StateObservable<T>, operator: OperatorFunction<T, O>) => StateObservable<O>;

export function operate<T, O>(source: StateObservable<T>, operator: OperatorFunction<T, O>, cold = false): StateObservable<O> {
  const o = operator(source);
  return makeStateObservable(o, cold);
}

export type Map = <T, O>(source: StateObservable<T>, projector: (s: T) => O) => StateObservable<O>
export function map<T, O>(source: StateObservable<T>, projector: (s: T) => O): StateObservable<O> {
  const mapped$ = rxMap(projector)(source);

  const obs = makeStateObservable(mapped$, true); // it's cold

  Object.defineProperty(obs, 'state', {
    get: function () {
      if (obs._state) return obs._state;

      return source.state === undefined ? undefined : projector(source.state);
    },
    set: function (v: T) {
      obs._state = v;
    }
  });

  return obs;
}
