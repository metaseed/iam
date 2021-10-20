import { pipe, range, timer } from 'rxjs';
import { retryWhen, map, mergeMap, zipWith } from 'rxjs/operators';
/**
 * backoff from error happens again
 *
 * @param maxTries number of retries, Infinity: always retry.
 * @param ms interval of first time retry. milliseconds
 * @param intervalMap map integer to milliseconds interval, i would increase from 1 until to the maxTries(include). default is (1,2,3,4...) => ((1, 2, 3, 4...) * interval) ms
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
 * backoff(8, 10, i=>i*i)
 * (1,2,3,4...) => (10, 40, 90, 160...) * ms
 *
 * @example complex retry interval calculation: interval 10, 40, 90, 160, 250; 10; 40, 90,... ms
 * backoff(Infinity, 10, i => {
 *  const t = (i-1)%5 + 1; // 1, 2, 3, 4, 5; 1, 2, 3...
 *  return t*t; // 1,4,9,16,25;1,4,9...
 * })
 *
 */
export function backoff<T>(maxTries: number, ms: number, intervalMap = (i: number) => i) {
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
