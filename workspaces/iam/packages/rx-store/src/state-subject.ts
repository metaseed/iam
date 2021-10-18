import { Observable, OperatorFunction, ReplaySubject, Subject } from "rxjs";
import { curry } from "./utils";

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
    setter(source).subscribe(this);
    return { set: (value: M) => source.next(value) , addSideEffect: curry(sideEffect, source)};
  }

  addSideEffect = curry(sideEffect, this);
}

export function sideEffect<T>(source: Observable<T>, effect: OperatorFunction<T,any>) {
  source.pipe(effect).subscribe();
}
