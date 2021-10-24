import { pipe, range, timer } from 'rxjs';
import { retryWhen, map, mergeMap, zipWith, tap } from 'rxjs/operators';
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
 * @example retry at a pace:  0, 40, 160, 360, 640, 1000 ms; repeat...
 * backoff({maxTries:Infinity,  interval: i => {const t = (i - 1) % 6; return 40*t * t}, skipIfConsecutiveErrors: 5});
 */
export function backoff<T>(config: BackoffConfig, interval?: number | ((i: number) => number));
export function backoff<T>(maxTriesOrConfig: number, interval: number | ((i: number) => number));
export function backoff<T>(maxTriesOrConfig: any, interval: number | ((i: number) => number)) {
  let maxTries: number;
  let skipIfConsecutiveErrors: number;
  if (typeof maxTriesOrConfig === 'object') {
    const config = maxTriesOrConfig;
    maxTries = config.maxTries;
    interval = config.interval ?? interval;
    skipIfConsecutiveErrors = config.skipIfConsecutiveErrors
  } else {
    maxTries = maxTriesOrConfig;
  }
  let consecutiveErrors = 0;
  return pipe(
    consecutiveStatus([5,Infinity], errors => consecutiveErrors = errors),
    retryWhen<T>(err$ =>
      range(1, maxTries).pipe(
        zipWith(err$), // attach number sequence to the errors observable
        map(([i]) => typeof interval === 'function' ? interval(i) : interval), // every error correspond to a squared result of number
        mergeMap(i => {
          if (skipIfConsecutiveErrors) {
            if (consecutiveErrors <= skipIfConsecutiveErrors)
              return timer(i);
            else //not emit: skip it.
              console.warn(`backoff: skip item process because of consecutive errors happened: ${skipIfConsecutiveErrors}`);
          } else
            return timer(i); // retry after timer emit
        })
      )
    )
  );
}


export interface BackoffConfig {
  maxTries: number;
  interval: number | ((i: number) => number);
  /**
   * to skip the item from source that triggers error if consecutive errors happens.(no successful emit in between)
   */
  skipIfConsecutiveErrors?: number
}

export function consecutiveStatus(
  errors: [number, number], consecutiveErrorStatus: (errors: number) => void,
  items?: [number, number], consecutiveItemStatus?: (items: number) => void) {
  let consecutiveErrors = 0;
  let consecutiveItems = 0
  let lastIsError = false;
  return tap({
    next: () => {
      if (lastIsError) {
        lastIsError = false;
        consecutiveErrors = 0;
        consecutiveItems = 0;
      } else {
        consecutiveItems++;
        if (items)
          if (items[0] <= consecutiveItems && consecutiveItems <= items[1])
            consecutiveItemStatus?.(consecutiveItems);
      }
    },
    error: () => {
      if (lastIsError) {
        consecutiveErrors++;
        if (errors[0] <= consecutiveErrors && consecutiveErrors <= errors[1])
          consecutiveErrorStatus(consecutiveErrors);
      } else {
        lastIsError = true;
        consecutiveErrors = 0;
        consecutiveItems = 0;
      }
    }
  })
}

