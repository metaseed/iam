import { Observable, OperatorFunction, ReplaySubject, Subject } from "rxjs";
import { backOffAfter } from ".";
import { pass } from "./operators/pass";

export type EffectOption = {
  // undefined: to disable the default
  error?: OperatorFunction<any, any>
};
const effectError = backOffAfter(6, 77);

const defaultEffectOption = { error: effectError };
/**
 * only difference with BehaviorSubject is:
 * it would not emit value if initial value is 'undefined'.
 */
export class StateSubject<T> extends ReplaySubject<T>{
  constructor(private _value?: T) {
    super(1);
    if (_value !== undefined) super.next(_value);
  }

  get value() {
    return this._value;
  }

  next(value: T): void {
    this._value = value;
    super.next(value);
  }

  addSetter<M>(setter: OperatorFunction<M, T>) {
    const source = new Subject<M>();
    source.pipe(setter).subscribe(this);
    return { set: (value: M) => source.next(value), addSideEffect: (effect: OperatorFunction<M, any>, options: EffectOption = defaultEffectOption) => sideEffect(source, effect, options) };
  }

  addSideEffect(effect: OperatorFunction<T, any>, options: EffectOption = defaultEffectOption) {
    sideEffect(this, effect, options);
    return this;
  }
}

export function sideEffect<T>(source: Observable<T>, effect: OperatorFunction<T, any>, options: EffectOption) {
  const option = {...defaultEffectOption, ...options};
  const error =  option.error? option.error: pass;
  source.pipe(effect, error).subscribe();
}
