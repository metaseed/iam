import { extend } from "hammerjs";
import { Observable, OperatorFunction, ReplaySubject, skip, Subject } from "rxjs";
import { backOffAfter } from "./operators";
import { pass } from "./operators/pass";

export type EffectOption = {
  /**
   * undefined: to disable the default
   */
  error?: OperatorFunction<any, any>
}

const effectError = backOffAfter(6, 77);

const defaultEffectOption = { error: effectError };
/**
 * operation triggered when observable value pass by.
 */
interface SideEffect<T> {
  /**
   * add side effect triggered by value passed by
   * @param effect side effect operation
   * @param options effect options. default option handled error retry with the backOffAfter operator
   */
  addEffect(effect: OperatorFunction<T, any>, options?: EffectOption)
}

export interface StateSetter<M> extends SideEffect<M> {
  /**
   * pass one message to the transform operation
   * @param message
   */
  next(message: M): void,
}

/**
 * keep last passed value as state
 *
 * only difference with BehaviorSubject is:
 * it would not emit value if initial value is 'undefined'.
 */
export class StateSubject<T> extends ReplaySubject<T> implements StateSetter<T>{
  /**
   *
   * @param _value the initial state, omit: no initial value
   */
  constructor(private _value?: T) {
    super(1);
    if (_value !== undefined) super.next(_value);
  }

  /**
   * get state: last passed value
   */
  get value() {
    return this._value;
  }

  /**
   * send next value
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
      next: (value: M) => source.next(value),
      addEffect: (effect: OperatorFunction<M, any>, options = defaultEffectOption) =>
        sideEffect(source, effect, {...options, ...defaultEffectOption})
    }  as StateSetter<M>;
  }

  addEffect(effect: OperatorFunction<T, any>, options = defaultEffectOption) {
    sideEffect(this, effect, {...options, ...defaultEffectOption});
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

export function sideEffect<T>(source: Observable<T>, effect: OperatorFunction<T, any>, options: EffectOption) {
  const option = { ...defaultEffectOption, ...options };
  const error = option.error ? option.error : pass;
  source.pipe(effect, error).subscribe();
}
