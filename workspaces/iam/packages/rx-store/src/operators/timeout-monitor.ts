import {
  OperatorFunction,
  Observable,
  SchedulerLike,
  asyncScheduler,
  SchedulerAction,
  Subscriber
} from 'rxjs';

export function isDate(value: any): value is Date {
  return value instanceof Date && !isNaN(+value);
}

/**
 * start timeout monitor when select the start value, stop timer when select the stop item.
 * If timeout:
 * unsubscribe from the source and then subscribe to the Observable output from observableOrValue function.
 * or emit specified value to subscriber and continue monitor the source.
 * @param due timeout value, unit is millisecond
 * @param startSelector is from the item to start timer?
 * @param stopSelector is the time to stop timer?
 * @param observableOrValue if timeout,
 *        if the function is defined to return Observable: unsubscribe from original source then subscribe to the new observable.
 *        if the function is defined to return an item: return the item to the subscriber and continue monitor the source.
 *        if omitted, just unsubscribe from the original source observable
 * @param timeOutScheduler       the scheduler to schedule the timeout action
 */
export const timeOutMonitor = <T, R>(
  due: number | Date,
  startSelector: (v: T) => boolean,
  stopSelector: (start: T, current: T) => boolean,
  observableOrValue?: ((start: T) => Observable<T | R>) | ((start: T) => T | R),
  timeOutScheduler: SchedulerLike = asyncScheduler
) => (source: Observable<T>) => new Observable<T | R>(subscriber => {
  const absoluteTimeout = isDate(due);
  const waitFor = absoluteTimeout ? +due - timeOutScheduler.now() : Math.abs(<number>due);
  let startValue: T;
  let timeoutAction: SchedulerAction<Subscriber<T | R>>;

  function dispatchTimeout(subscriber: Subscriber<T | R>): void {
    if (observableOrValue) {
      const o = observableOrValue(startValue);
      if (o instanceof Observable) {
        subscriber.unsubscribe();
        const sub = o.subscribe(subscriber);
        subscriber.add(sub);
      } else {
        subscriber.next(o);
      }
    } else {
      subscriber.unsubscribe()
    }
  }

  function scheduleTimeout(): void {
    if (timeoutAction) {
      // Recycle the action if we've already scheduled one.
      timeoutAction = <SchedulerAction<Subscriber<T | R>>>(
        timeoutAction.schedule(subscriber, this.waitFor)
      );
    } else {
      subscriber.add(
        (timeoutAction = <SchedulerAction<Subscriber<T | R>>>(
          timeOutScheduler.schedule<Subscriber<T | R>>(
            dispatchTimeout,
            waitFor,
            subscriber
          )
        ))
      );
    }
  }

  const sub = source.subscribe({
    next(value) {
      if (startSelector(value)) {
        startValue = value;
        if (!waitFor) {
          scheduleTimeout();
        }
      }
      if (stopSelector(this.startValue, value)) {
        if (timeoutAction) {
          timeoutAction.unsubscribe();
        }
      }
      subscriber.next(value);
    },
    error(err) { subscriber.error(err) },
    complete() { subscriber.complete() }
  });

  return sub;
});

