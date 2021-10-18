import { pipe, range, timer } from 'rxjs';
import { retryWhen, map, mergeMap, zipWith } from 'rxjs/operators';
/*
ajax('/api/endpoint')
  .pipe(backoff(3, 250))
  .subscribe(data => handleData(data));
*/
/**
 *
 * @param maxTries number of retries
 * @param ms interval of first time retry. (1,2,3,4...) => (1, 4, 9, 16...) * ms
 * @returns
 */
export function backOffAfter<T>(maxTries, ms) {
  return pipe(
    retryWhen<T>(err$ =>
      range(1, maxTries).pipe(
        zipWith(err$), // attach number sequence to the errors observable
        map(([i, _]) => i * i), // every error correspond to a squared result of number
        mergeMap(i => timer(i * ms))
      )
    )
  );
}
