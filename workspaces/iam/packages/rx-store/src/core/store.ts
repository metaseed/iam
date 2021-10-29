import { combineLatest, Subscription } from "rxjs";
import { StateObservable, state } from "./state-observable";

type StateMemberNames<T> = { [K in keyof T]: K extends 'state$' ? never : T[K] extends StateObservable<any> ? K : never }[keyof T];
type StateMember<T> = Pick<T, StateMemberNames<T>>

type State<T> = {
  [K in keyof T]: StateObservable<T[K]>
}

export class Store {

}

export function combine<T>(states: State<T>, hotSubParent?: Subscription): StateObservable<T> {
  const combined$ = combineLatest(states);
  return state<T>(combined$);
}
