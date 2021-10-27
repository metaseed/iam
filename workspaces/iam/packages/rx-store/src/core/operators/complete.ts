import { Observable, tap } from "rxjs";

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

