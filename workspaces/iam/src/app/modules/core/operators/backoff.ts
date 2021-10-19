import { pipe, range, timer } from 'rxjs';
import { retryWhen, map, mergeMap, zipWith } from 'rxjs/operators';
/**
 *
 * @param maxTries number of retries
 * @param ms interval of first time retry.
 * @param intervalMap map integer to milliseconds interval, default is (1,2,3,4...) => (1, 4, 9, 16...) * ms
 * @returns
 *
 * @example
 *
 * ajax('/api/endpoint')
 * .pipe(backoff(3, 250))
 * .subscribe(data => handleData(data));
 */
export function backOffAfter<T>(maxTries: number, ms: number, intervalMap = (i: number) => i * i) {
  return pipe(
    retryWhen<T>(err$ =>
      range(1, maxTries).pipe(
        zipWith(err$), // attach number sequence to the errors observable
        map(([i]) => intervalMap(i)), // every error correspond to a squared result of number
        mergeMap(i => timer(i * ms))
      )
    )
  );
}
