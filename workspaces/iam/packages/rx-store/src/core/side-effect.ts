import { Observable, OperatorFunction } from "rxjs";
import { backoff } from "./operators";
import { pass } from "./operators/pass";

export type EffectOption = {
  /**
   * undefined: to disable the default handler.
   *
   * default one retry at a pace: 10, 40, 90, 160, 250, 500; 10, 40, 90, 160, 250, 500; 10, 40... ms
   */
  error?: OperatorFunction<any, any>
}

/**
 * retry after error at a pace: 10, 40, 90, 160, 250, 500; 10, 40, 90, 160, 250, 500; 10, 40... ms
 */
const effectError = backoff(Infinity, 10, i => {
  const t = (i - 1) % 6 + 1; return t * t
});

export const defaultEffectOption = { error: effectError };
/**
 * operation triggered when observable value pass by.
 */
export interface SideEffect<T> {
  /**
   * add side effect triggered by value passed by.
   * subscribe to the observable and handle errors from it.
   *
   * default option handled error retry at a delay pace:
   * 10, 40, 90, 160, 250, 500; 10, 40, 90, 160, 250, 500; 10, 40... ms.
   * could use `backoff` operator or any others to customize.
   * @param effect side effect operation
   * @param options effect options.
   */
  addEffect(effect: OperatorFunction<T, any>, options?: EffectOption): any
}

export function sideEffect<T>(source: Observable<T>, effect: OperatorFunction<T, any>, options: EffectOption = defaultEffectOption) {
  const option = { ...defaultEffectOption, ...options };
  const error = option.error ? option.error : pass;
  source.pipe(effect, error).subscribe();
  return source;
}
