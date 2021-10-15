import { ReplaySubject } from "rxjs";

export class StateSubject<T> extends ReplaySubject<T>{
  constructor(private _value?: T) {
    super(1);
    if(_value !== undefined) super.next(_value);
  }

  get value() {
    return this._value;
  }

  next(value: T): void {
    this._value = value;
    super.next(value);
  }
}
