import { OperatorFunction, ReplaySubject, skip, Subject } from "rxjs";
import { StateObservable } from "./state-observable";
import { defaultEffectOption, EffectOption, sideEffect, SideEffect } from './side-effect';

export interface StateSetter<T> extends SideEffect<T> {
  /**
   * pass one value in.
   * @param value
   */
  next(value: T): void,
}

export interface IStateSubject<T> extends StateSetter<T>, Exclude<SideEffect<T>, StateObservable<T>> {
  addEffect(effect: OperatorFunction<T, any>, options?: EffectOption): IStateSubject<T>
}

/**
 * keep latest passed value as state
 *
 * only difference with BehaviorSubject is:
 * it would not emit value if initial value is 'undefined'.
 */
export class StateSubject<T> extends ReplaySubject<T> implements IStateSubject<T>{
  /**
   *
   * @param _value the initial state, omit: no initial value
   */
  constructor(private _value?: T) {
    super(1);
    if (_value !== undefined) super.next(_value);
  }

  get value() {
    return this._value;
  }

  /**
   * set the sate value
   * @param value
   */
  next(value: T): void {
    this._value = value;
    super.next(value);
  }

  /**
   * add one way to transform a message and set the sate.
   * @param operation operation to transform a message into state value, it's like the operation in the store's reducer for the action message
   * @returns
   */
  addSetter<M>(operation: OperatorFunction<M, T>) {
    const source = new Subject<M>();
    source.pipe(operation).subscribe(this);
    return {
      next: source.next,
      addEffect: (effect: OperatorFunction<M, any>, options = defaultEffectOption) =>
        sideEffect(source, effect, { ...options, ...defaultEffectOption })
    } as StateSetter<M>;
  }

  addEffect(effect: OperatorFunction<T, any>, options = defaultEffectOption) {
    sideEffect(this, effect, { ...options, ...defaultEffectOption });
    return this;
  }

  /**
   * Observable without current state
   * current state (if available) would not emitted to observer
   */
  get noState$() {
    const o = this.asObservable();
    if (this.value !== undefined)
      return o.pipe(skip(1));
    else
      return o;
  }
}
