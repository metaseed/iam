import { Observable, OperatorFunction } from "rxjs";
import { backOffAfter } from "./operators";
import { pass } from "./operators/pass";

export type EffectOption = {
  /**
   * undefined: to disable the default
   */
  error?: OperatorFunction<any, any>
}

const effectError = backOffAfter(6, 77);

export const defaultEffectOption = { error: effectError };
/**
 * operation triggered when observable value pass by.
 */
export interface SideEffect<T> {
  /**
   * add side effect triggered by value passed by
   * @param effect side effect operation
   * @param options effect options. default option handled error retry with the backOffAfter operator
   */
  addEffect(effect: OperatorFunction<T, any>, options?: EffectOption)
}


export function sideEffect<T>(source: Observable<T>, effect: OperatorFunction<T, any>, options: EffectOption) {
  const option = { ...defaultEffectOption, ...options };
  const error = option.error ? option.error : pass;
  source.pipe(effect, error).subscribe();
}
