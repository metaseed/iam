import { Observable, tap } from "rxjs";
import { sideEffect } from "./side-effect";
import { map as myMap, operate } from "./state-observable";

export function makeStateObservable<T>(observable: Observable<T>, cold: boolean) {
  const state$ = Object.create(tap<T>(o => (state$ as any).state = o)(observable));
  state$.addEffect = sideEffect.bind(state$, state$);
  state$.operate = operate.bind(state$, state$);
  state$.map = myMap.bind(state$, state$);

  if (!cold) state$.subscription = state$.subscribe();
  return state$;
}

