import { Observable, OperatorFunction } from "rxjs";
import { backoff } from "./operators";
import { pass } from "./operators/pass";

export interface EffectOption {
  /**
   * undefined: to disable the default handler.
   *
   * default one retry at a pace: 0, 40, 160, 360, 640, 1000, 1440, 1960; 0, 40, 160, 360, 640, ... ms
   */
  error?: OperatorFunction<any, any>
}

const effectError = backoff(Infinity,  i => {
  const t = (i - 1) % 8; return 40* t * t
});

export const defaultEffectOption = {
  error: effectError,
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
   * 0, 40, 160, 360, 640, 1000, 1440, 1960; 0, 40, 160, 360, 640, ... ms
   * could use `backoff` operator or any others to customize.
   * @param effect side effect operation
   * @param options effect options.
   */
  addEffect(effect: OperatorFunction<T, unknown>, options?: EffectOption): any
}

export function sideEffect<T>(source: Observable<T>, effect: OperatorFunction<T, unknown>, option?: EffectOption) {
  const options = { ...defaultEffectOption, ...option };
  const error = options.error ? options.error : pass;
  source.pipe(effect, error).subscribe();
  return source;
}

