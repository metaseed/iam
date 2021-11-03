import { combineLatest } from "rxjs";
import { StateObservable, state } from "./state-observable";
import { makeStateObservable } from "./state-observable.internal";

type StateMemberNames<T> = { [K in keyof T]: K extends 'state$' ? never : T[K] extends StateObservable<any> ? K : never }[keyof T];
type StateMember<T> = Pick<T, StateMemberNames<T>>

type State<T> = {
  [K in keyof T]: StateObservable<T[K]>
}

export class Store {

}

export function combine<T>(states: State<T>): StateObservable<T> {
  const combined$ = combineLatest(states);
  const obs = makeStateObservable(combined$, true); // it's cold

  Object.defineProperty(obs, 'state', {
    get: function () {
      // if observable emit, return the last value directly
      if (obs._state !== undefined) return obs._state;

      const res = {};
      for (const [key, value] of Object.entries(states)) {
        res[key] = (value as StateObservable<any>).state;
      }
      return res;
    },
    set: function(v: T) {
      obs._state = v;
    }
  });

  return obs;
}
