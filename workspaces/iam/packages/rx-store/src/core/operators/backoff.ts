import { EMPTY, Observable, pipe, timer } from 'rxjs';
import { retryWhen, mergeMap, tap } from 'rxjs/operators';
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
 * backoff(Infinity,  i => {const t = (i - 1) % 6; return 40*t * t, 5});
 */
export function backoff<T>(maxTries: number, interval: number | ((i: number) => number), failIfConsecutiveErrors?: number) {
  return error(status => {
    if (status.errors >= maxTries) return null; // stop

    if (failIfConsecutiveErrors && status.consecutiveErrors < failIfConsecutiveErrors) {
      const intervalTime = typeof interval === 'function' ? interval(status.errors) : interval;
      return timer(intervalTime); // retry after timer emit.
    }

    return EMPTY; // skip the item, and not throw, it's swallowed. we just stop retry
  });

  // below code not work for maxTries = Infinity
  // retryWhen<T>(err$ =>
  //   range(1, maxTries).pipe(
  //     zipWith(err$), // attach number sequence to the errors observable
  //     map(([i]) => typeof interval === 'function'? interval(i): interval), // every error correspond to a squared result of number
  //     mergeMap(i => timer(i))
  //   ))
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


export interface ErrorStatus {
  errors: number;
  consecutiveErrors: number;
  consecutiveSuccesses: number;
  error: any;
}

export function error<T>(
  /**
   * return:
   * null: stop
   * EMPTY: continue
   * Observable<any>: when emit would retry. i.e. return timer(2000) would retry 2s later.
   */
  errorHandler: (status: ErrorStatus) => Observable<any> | null) {
  const status: ErrorStatus = {
    errors: 0,
    consecutiveErrors: 0,
    consecutiveSuccesses: 0,
    error: undefined
  }
  let stop = false;

  return pipe(
    consecutiveStatus([1, Infinity], errors => status.consecutiveErrors = errors,
      [1, Infinity], successes => status.consecutiveSuccesses = successes),
    retryWhen<T>(err$ => {
      return err$.pipe(
        mergeMap(err => {
          status.errors++
          status.error = err;
          const result = errorHandler(status);
          if (result === null) {
            stop = true;
            return EMPTY;
          }

          return result;
        }),
        complete(o => stop),
      )
    })
  );
}

export function complete<T>(condition: (o: T) => boolean) {
  return (source: Observable<T>) => new Observable<T>(observer => {
    source.pipe(
      tap(o => {
        if (condition(o)) {
          observer.complete();
        }
      })
    ).subscribe(observer);
  });
}
