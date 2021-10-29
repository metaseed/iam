import { StateObservable } from "./state-observable";

type StateMemberNames<T> =  {[K in keyof T]: K extends 'state$' ? never: T[K] extends StateObservable<any> ? K : never }[keyof T];
type StateMember<T> = Pick<T, StateMemberNames<T>>

export class Store {
  combine(...)
}
