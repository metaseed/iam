import { pipe, range, timer } from 'rxjs';
import { retryWhen, map, mergeMap, zipWith } from 'rxjs/operators';
/*
ajax('/api/endpoint')
  .pipe(backoff(3, 250))
  .subscribe(data => handleData(data));
*/
export function backOffAfter<T>(maxTries, ms) {
  return pipe(
    retryWhen<T>(attempts =>
      range(1, maxTries).pipe(
        zipWith(attempts), // attach number sequence to the errors observable
        map(([i, _]) => i * i), // every error correspond to a squared result of number
        mergeMap(i => timer(i * ms))
      )
    )
  );
}
