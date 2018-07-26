import { pipe, range, timer } from 'rxjs';
import { retryWhen, zip, map, mergeMap } from 'rxjs/operators';
/*
ajax('/api/endpoint')
  .pipe(backoff(3, 250))
  .subscribe(data => handleData(data));
*/
export function backoff<T>(maxTries, ms) {
  return pipe(
    retryWhen(attempts =>
      range(1, maxTries).pipe(
        zip(attempts, i => i), // attach number sequence to the errors observable
        map(i => i * i), // every error correspond to a squared result of number
        mergeMap(i => timer(i * ms))
      )
    )
  );
}
