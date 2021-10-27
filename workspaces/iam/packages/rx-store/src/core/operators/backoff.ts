import { EMPTY, Observable, pipe, timer } from 'rxjs';
import { retryWhen, map, mergeMap, tap } from 'rxjs/operators';
/**
 * backoff from error happens again
 *
 * @param maxTries number of retries, Infinity: always retry.
 * @param interval interval of first time retry. milliseconds.
 * or it's intervalMap that maps integer to milliseconds interval,
 * `i` would increase from 1 until to the maxTries(include). default is (1,2,3,4...) => ((1, 2, 3, 4...) * interval) ms
 * @returns
 *
 * @example
 *
 * ajax('/api/endpoint')
 * .pipe(backoff(3, 250))
 * .subscribe(data => handleData(data));
 *
 * @example retry immediately every time after error happens, until tried 10 times
 * backoff(10, 0)
 *
 * @example always retry after 5 seconds from error happens.
 * backoff(Infinity, 5000);
 *
 * @example retry after error happens, 8 times, with interval from error time increase at a quadratic of i;
 * backoff(8, i=>10*i*i)
 * (1,2,3,4...) => (10, 40, 90, 160...) * ms
 *
 * @example complex retry interval calculation: interval 10, 40, 90, 160, 250; 10; 40, 90,... ms
 * backoff(Infinity, i => {
 *  const t = (i-1)%5 + 1; // 1, 2, 3, 4, 5; 1, 2, 3...
 *  return 10*t*t; // 0, 40, 90, 160, 250; 10; 40, 90,...
 * })
 *
 * @example retry at a pace: 0, 40, 160, 360, 640, 1000, 1440, 1960; 0, 40, 160, 360, 640, ... ms
 *  backoff(Infinity,  i => {const t = (i - 1) % 8; return 40*t * t});
 *
 * @example retry at a pace:  0, 40, 160, 360, 640, 1000 ms; repeat... and skip the item from source that triggers error if 5 consecutive errors happens
 * backoff({maxTries:Infinity,  interval: i => {const t = (i - 1) % 6; return 40*t * t}, skipIfConsecutiveErrors: 5});
 */
export function backoff<T>(config: BackoffConfig, interval?: number | ((i: number) => number));
export function backoff<T>(maxTriesOrConfig: number, interval: number | ((i: number) => number));
export function backoff<T>(maxTriesOrConfig: any, interval?: number | ((i: number) => number)) {
  let config: BackoffConfig;
  if (typeof maxTriesOrConfig === 'object') {
    config = maxTriesOrConfig as BackoffConfig;
    config.interval ??= interval as (number | ((i: number) => number));
  } else {
    config = { maxTries: maxTriesOrConfig, interval: interval as (number | ((i: number) => number)) }
  }
  let consecutiveErrors = 0;
  return pipe(
    consecutiveStatus([config.failIfConsecutiveErrors??1, Infinity], errors => consecutiveErrors = errors),
    retryWhen<T>(err$ => {
      let errors = 0;
      return err$.pipe(
        map(err => [errors++, err]),
        complete(o => errors >= config.maxTries),
        map(([i, err]) => [typeof interval === 'function' ? interval(i) : interval, err]),
        mergeMap(([i, err]) => {
          config.stateReporter?.('Error', err);
          if (config.failIfConsecutiveErrors != null && consecutiveErrors < config.failIfConsecutiveErrors) {
            return timer(i).pipe(tap(() => config.stateReporter?.('Retry'))); // retry after timer emit.
          }
          config.stateReporter?.('Fail');
          console.warn(`backoff: skip item process because of consecutive errors happened: consecutiveError: ${consecutiveErrors}>=${config.failIfConsecutiveErrors}\n error: ${err}`);
          return EMPTY;
        })
      )
    }
    )
  );
}

export type BackoffStateReporter = (state: 'Error' | 'Retry' | 'Fail', context?: any) => void;
export interface BackoffConfig {
  maxTries: number;
  interval: number | ((i: number) => number);
  /**
   * to skip the item from source that triggers error if consecutive errors happens.(no successful emit in between)
   */
  failIfConsecutiveErrors?: number;
  stateReporter?: BackoffStateReporter
}

export function consecutiveStatus<T>(
  errors: [number, number], consecutiveErrorStatus: (errors: number) => void,
  items?: [number, number], consecutiveItemStatus?: (items: number) => void) {
  let consecutiveErrors = 0;
  let consecutiveItems = 0
  let lastIsError = false;
  return tap<T>({
    next: () => {
      if (lastIsError) {
        lastIsError = false;
        if (errors[0] <= consecutiveErrors && consecutiveErrors <= errors[1])
          consecutiveErrorStatus(0);
        consecutiveErrors = 0;
        consecutiveItems = 0;

      } else {
        consecutiveItems++;
      }
      if (items)
        if (items[0] <= consecutiveItems && consecutiveItems <= items[1])
          consecutiveItemStatus?.(consecutiveItems);
    },
    error: () => {
      if (lastIsError) {
        consecutiveErrors++;
      } else {
        lastIsError = true;
        if (items)
          if (items[0] <= consecutiveItems && consecutiveItems <= items[1])
            consecutiveItemStatus?.(0);
        consecutiveErrors = 0;
        consecutiveItems = 0;
      }
      if (errors[0] <= consecutiveErrors && consecutiveErrors <= errors[1])
        consecutiveErrorStatus(consecutiveErrors);
    }
  })
}

export function complete<T>(condition: (o: T) => boolean) {
  return (source:Observable<T>) => new Observable<T>(subscriber => {
    source.pipe(
      tap(o => {
        if (condition(o)) {
          subscriber.complete();
        }
      })
    ).subscribe(subscriber);
  });
}
