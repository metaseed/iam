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
 * or emit item to subscriber and continue monitor the source.
 * @param due timeout value, unit is millisecond
 * @param startSelector is from the item to start timer?
 * @param stopSelector is the time to stop timer?
 * @param observableOrValue if timeout,
 *        if the function is defined to return Observable: unsubscribe from original source then subscribe to the new observable.
 *        if the function is defined to return an item: return the item to the subscriber and continue monitor the source.
 *        if omitted, just unsubscribe from the original source observable
 * @param scheduler       the scheduler to schedule the timeout action
 */
export const timeOutMonitor = <T, R>(
  due: number | Date,
  startSelector: (v: T) => boolean,
  stopSelector: (start: T, current: T) => boolean,
  observableOrValue?: ((start: T) => Observable<T | R>) | ((start: T) => T | R),
  scheduler: SchedulerLike = asyncScheduler
) => (source: Observable<T>) => new Observable<T | R>(observer => {
  const absoluteTimeout = isDate(due);
  const waitFor = absoluteTimeout ? +due - scheduler.now() : Math.abs(<number>due);
  let startValue: T;
  let action: SchedulerAction<Subscriber<T | R>>;

  function dispatchTimeout(obs: Subscriber<T | R>): void {
    if (observableOrValue) {
      const o = observableOrValue(startValue);
      if (o instanceof Observable) {
        obs.unsubscribe();
        const sub = o.subscribe(obs);
        obs.add(sub);
      } else {
        obs.next(o);
      }
    } else {
      obs.unsubscribe()
    }
  }

  function scheduleTimeout(): void {
    if (action) {
      // Recycle the action if we've already scheduled one.
      action = <SchedulerAction<Subscriber<T | R>>>(
        action.schedule(observer, this.waitFor)
      );
    } else {
      observer.add(
        (action = <SchedulerAction<Subscriber<T | R>>>(
          scheduler.schedule<Subscriber<T | R>>(
            dispatchTimeout,
            waitFor,
            observer
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
        if (action) {
          action.unsubscribe();
        }
      }
      observer.next(value);
    },
    error(err) { observer.error(err) },
    complete() { observer.complete() }
  });

  return sub;
});

