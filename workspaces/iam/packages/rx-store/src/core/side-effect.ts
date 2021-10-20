import { Observable, OperatorFunction } from "rxjs";
import { backoff } from "./operators";
import { pass } from "./operators/pass";

export type EffectOption = {
  /**
   * undefined: to disable the default handler, which retry at a pace: 100, 400, 900, 1600, 2500; 100, 400, 900, 1600, 2500; 100, 400... ms
   */
  error?: OperatorFunction<any, any>
}

/**
 * retry at a pace: 100, 400, 900, 1600, 2500; 100, 400, 900, 1600, 2500; 100, 400... ms
 */
const effectError = backoff(Infinity, 100, i => {
  const t = (i - 1) % 5 + 1; return t * t
});

export const defaultEffectOption = { error: effectError };
/**
 * operation triggered when observable value pass by.
 */
export interface SideEffect<T> {
  /**
   * add side effect triggered by value passed by
   * @param effect side effect operation
   * @param options effect options. default option handled error retry at a delay pace: 100, 400, 900, 1600, 2500; 100, 400, 900, 1600, 2500; 100, 400... ms
   */
  addEffect(effect: OperatorFunction<T, any>, options?: EffectOption): any
}

export function sideEffect<T>(source: Observable<T>, effect: OperatorFunction<T, any>, options: EffectOption = defaultEffectOption) {
  const option = { ...defaultEffectOption, ...options };
  const error = option.error ? option.error : pass;
  source.pipe(effect, error).subscribe();
  return source;
}
