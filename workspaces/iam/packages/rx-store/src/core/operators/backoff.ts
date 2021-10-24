import { pipe, range, timer } from 'rxjs';
import { retryWhen, map, mergeMap, zipWith } from 'rxjs/operators';
/**
 * backoff from error happens again
 *
 * @param maxTries number of retries, Infinity: always retry.
 * @param interval interval of first time retry. milliseconds
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
 */
export function backoff<T>(maxTries: number, interval: number|((i: number) => number)) {
  return pipe(
    retryWhen<T>(err$ =>
      range(1, maxTries).pipe(
        zipWith(err$), // attach number sequence to the errors observable
        map(([i]) => typeof interval === 'function'? interval(i): interval), // every error correspond to a squared result of number
        mergeMap(i => timer(i))
      )
    )
  );
}
