import { Observable, OperatorFunction, Subject, Subscriber } from "rxjs";
import { state } from "./state-observable";

export class State<M,T=M> extends Subject<M> {
  constructor(setter: OperatorFunction<M,T>){
    super();
    state(setter(this))
  }

  set(msg: M) {

  }
}
