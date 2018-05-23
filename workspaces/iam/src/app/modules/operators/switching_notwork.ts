import { Observable, Subscription, asyncScheduler } from 'rxjs';
import { subscribeOn } from 'rxjs/operators';
export const switching = () => <T>(source: Observable<Observable<T>>) =>
  new Observable<T>(observer => {
    let lastSubscription: Subscription;
    let subscription = source.subscribe(
      innerObservable => {
        const innerSubscription = innerObservable.subscribe(item => {
          setTimeout(_ => {
            if (lastSubscription && lastSubscription !== innerSubscription) {
              lastSubscription.unsubscribe();
              // subscription.remove(lastSubscription);
            }
          }, 0);
          observer.next(item);
        });
        // subscription.add(lastSubscription);
      },
      err => observer.error(err)
    );
    return subscription;
  });
