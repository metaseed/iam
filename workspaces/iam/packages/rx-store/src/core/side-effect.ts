import { Observable, OperatorFunction } from "rxjs";
import { pass } from "./operators/pass";
import { defaultEffectErrorOperator } from "./side-effect.internal";

export interface EffectOption {
  /**
   * undefined: to disable the default handler.
   */
  error?: OperatorFunction<any, any>
}

export const defaultEffectOption = {
  errorOperator: defaultEffectErrorOperator,
};

/**
 * operation triggered when observable value pass by.
 */
export interface SideEffect<T> {
  /**
   * add side effect triggered by value passed by.
   * subscribe to the observable and handle errors from it.
   *
   * default option handled error retry at a delay pace:
   * 0, 40, 160, 360, 640, 1000ms; then repeat...
   * it also handles error skip: skip process the item from source observable if 5 consecutive errors happens.
   * could use `backoff` operator or any others to customize.
   * @param effect side effect operation
   * @param options effect options.
   */
  addEffect(effect: OperatorFunction<T, unknown>, options?: EffectOption): any
}

export function sideEffect<T>(source: Observable<T>, effect: OperatorFunction<T, unknown>, option?: EffectOption) {
  const options = { ...defaultEffectOption, ...option };
  const error = options.errorOperator ? options.errorOperator : pass;
  source.pipe(effect, error).subscribe();
  return source;
}

