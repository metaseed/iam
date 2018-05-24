import { Observable, Subscription } from 'rxjs';

/**
 * Feature Request: https://github.com/ReactiveX/rxjs/issues/3736
 *
 * observable A: -----a0----a1-----a2-----
 * observable B:          -----b0-----b1-----b2-----
 * switchAll operator
 * output:       -----a0-------b0-----b1-----b2-----
 *
 * Note: a1 is not output.
 * observable A: -----a0----a1-----a2-----
 * observable B:          -----b0-----b1-----b2-----
 * switchIfEmit operator
 * output:       -----a0----a1-b0-----b1-----b2-----
 *
 * Note: a1 is outputed
 *
 * the difference is switchIfEmit operator is switched when new observable emit item,
 * while switchAll operator switched when new observable available.
 *
 * Semantics:
 * 1. it will wait all the inner observables, any one that emit a value will be switched to the outer observable output.
 * 2. if another inner observable emmit a value, then the outer would switch to it. the original inner observable would be unsubscribed.
 * 3. if the outer complete, all the active(emiting or waiting to emit) inner observables would be unsubscribed.
 * 4. if one inner observable complete, it will continue waiting other inner observables.
 * 5. any inner observable error would be tramsmit to the ourter observable.
 */
export const switchIfEmit = () => <T>(source: Observable<Observable<T>>) =>
  new Observable<T>(observer => {
    const subscription = new Subscription();
    let lastInnerObservable: Observable<T>;
    const sourceSubscription = source.subscribe(
      innerObservable => {
        const innerSubscription = innerObservable.subscribe(item => {
          if (lastInnerObservable && lastInnerObservable !== innerObservable) {
            const sourceSubscription = (<any>lastInnerObservable).subscription;
            subscription.remove(sourceSubscription);
            sourceSubscription.unsubscribe();
            (<any>lastInnerObservable).subscription = undefined;
          }
          lastInnerObservable = innerObservable;
          observer.next(item);
        });
        (<any>innerObservable).subscription = innerSubscription;
        subscription.add(innerSubscription);
      },
      err => observer.error(err)
    );
    subscription.add(sourceSubscription);
    return subscription;
  });
