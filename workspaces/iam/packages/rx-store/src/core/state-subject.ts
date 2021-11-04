import { OperatorFunction, ReplaySubject, skip, Subject } from "rxjs";
import { StateObservable, operate, map as myMap } from "./state-observable";
import { defaultEffectOption, EffectOption, sideEffect, SideEffect } from './side-effect';

export interface StateSetter<T> extends SideEffect<T> {
  /**
   * pass one value in.
   * @param value
   */
  next(value: T): void,
}

type AddEffect<T> = (effect: OperatorFunction<T, unknown>, options?: EffectOption) => IStateSubject<T>

export interface IStateSubject<T> extends  StateSetter<T>, StateObservable<T> {
  addEffect: AddEffect<T>,
}

/**
 * keep latest passed value as state, even the StateSubject has not subscriber.
 *
 * only difference with BehaviorSubject is:
 * it would not emit value if initial value is 'undefined'.
 */
export class StateSubject<T> extends ReplaySubject<T> implements IStateSubject<T>{
  /**
   *
   * @param _state the initial state, omit: no initial value
   */
  constructor(private _state?: T) {
    super(1);
    if (_state !== undefined) super.next(_state);
  }

  get state() {
    return this._state;
  }

  /**
   * set the sate value
   * @param state
   */
  next(state: T): void {
    this._state = state;
    super.next(state);
  }

  /**
   * add one way to transform a message and set the sate.
   * @param operation operation to transform a message into state value, it's like the operation in the store's reducer for the action message
   * @returns
   */
  addSetter<M>(operation: OperatorFunction<M, T>): StateSetter<M> {
    const source = new Subject<M>();
    source.pipe(operation).subscribe(this);
    return {
      next: source.next,
      addEffect: (effect: OperatorFunction<M, unknown>, options?: EffectOption) =>
        sideEffect(source, effect, { ...defaultEffectOption, ...options })
    };
  }

  addEffect = sideEffect.bind(this, this) as any as AddEffect<T>;
  operate = operate.bind(this,this) as <O>(operator: OperatorFunction<T, O>) => StateObservable<O>;
  map = myMap.bind(this,this) as <O>(projector: (s: T) => O) => StateObservable<O>;

  /**
   * Observable without current state
   * current state (if available) would not emitted to observer
   */
  get noState$() {
    const o = this.asObservable();
    if (this.state !== undefined)
      return o.pipe(skip(1));
    else
      return o;
  }
}
