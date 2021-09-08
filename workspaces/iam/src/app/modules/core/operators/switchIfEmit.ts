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
 * 1. it will wait all the inner observables, any one that emit a value will be switched to
 *    the outer observable output.
 * 2. if another inner observable emit a value, then the outer would switch to it. the
 *    original inner observable would be unsubscribed.
 * 3. if the source observable(emit observable items) completes/has error, it will continue waiting
 *    for the inner observables that already emitted by the source.
 * 4. if the outer complete, all the active(emitting or waiting to emit) inner observables
 *    would be unsubscribed.
 * 5. if one inner observable completes, it will continue waiting for other inner observables.
 * 6. any inner observable error would be transmit to the outer observable.
 * 7. if the outer observable is unsubscribed, the inner active observables and the upper
 *    source observable would be unsubscribed.
 * 8. the switchTester function used to add further condition logic to switch while item emitting.
 *     if omitted: switch with the first item.
 *     if defined: switch when it returns true.
 */
export const switchIfEmit = (switchTester: (T) => boolean = undefined) => <T>(
  source: Observable<Observable<T>>
) =>
  new Observable<T>(observer => {
    const subscription = new Subscription();
    let lastInnerObservable: Observable<T>;
    const sourceSubscription = source.subscribe({
      next(innerObservable) {
        const innerSubscription = innerObservable.subscribe(item => {
          if (lastInnerObservable && lastInnerObservable !== innerObservable) {
            if (!switchTester || (switchTester && switchTester(item))) {
              const tracedInnerSubscription = (<any>lastInnerObservable).subscription;
              subscription.remove(tracedInnerSubscription);
              tracedInnerSubscription.unsubscribe();
              (<any>lastInnerObservable).subscription = undefined;
            }
          }
          lastInnerObservable = innerObservable;
          observer.next(item);
        });
        (<any>innerObservable).subscription = innerSubscription;
        subscription.add(innerSubscription);
      },
      error(err){ return  observer.error(err)}
    });
    subscription.add(sourceSubscription);
    return subscription;
  });
