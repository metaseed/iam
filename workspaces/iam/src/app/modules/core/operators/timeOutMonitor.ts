import {
  OperatorFunction,
  Observable,
  SchedulerLike,
  asyncScheduler,
  ObservableInput,
  Operator,
  Subscriber,
  TeardownLogic,
  SchedulerAction
} from 'rxjs';
import { OuterSubscriber } from 'rxjs/internal/OuterSubscriber';

export function isDate(value: any): value is Date {
  return value instanceof Date && !isNaN(+value);
}

/**
 * start timeout monitor when select the start value, stop timer when select the stop item.
 * If timeout, unsubscribe and then subscribe to the Observable output from withObservable function.
 * @param due timeout value, unit is miliscond
 * @param startSelector is from the item to start timer?
 * @param stopSelector is the time to stop timer?
 * @param withObservable if timeout,
 *        if the function is defined to return Observable: unsubscribe from original source then subscribe to the new observable.
 *        if the function is defined to return an item: return the item to the subscriber and continue monitor the source.
 *        if omited, just unscribe from the original source observable
 * @param scheduler       the scheduler to schedue the timeout action
 */
export function timeOutMonitor<T, R>(
  due: number | Date,
  startSelector: (v:T) => boolean,
  stopSelector: (start: T, current: T) => boolean,
  withObservable: ((start: T) => Observable<T | R>)| ((start: T) =>T|R) = undefined,
  scheduler: SchedulerLike = asyncScheduler
): OperatorFunction<T, T | R> {
  return (source: Observable<T>) => {
    let absoluteTimeout = isDate(due);
    let waitFor = absoluteTimeout ? +due - scheduler.now() : Math.abs(<number>due);
    return source.lift(
      new TimeoutWithOperator(
        waitFor,
        absoluteTimeout,
        startSelector,
        stopSelector,
        withObservable,
        scheduler
      )
    );
  };
}

class TimeoutWithOperator<T, R> implements Operator<T, T | R> {
  constructor(
    private waitFor: number,
    private absoluteTimeout: boolean,
    private startSelector: (T) => boolean,
    private stopSelector: (start: T, current: T) => boolean,
    private withObservable: ((start: T) => Observable<T | R>)| ((start: T) =>T|R),
    private scheduler: SchedulerLike
  ) {}
  call(subscriber: Subscriber<T>, source: any): TeardownLogic {
    return source.subscribe(
      new TimeoutWithSubscriber(
        subscriber,
        this.absoluteTimeout,
        this.waitFor,
        this.startSelector,
        this.stopSelector,
        this.withObservable,
        this.scheduler
      )
    );
  }
}

class TimeoutWithSubscriber<T, R> extends OuterSubscriber<T, R> {
  private action: SchedulerAction<TimeoutWithSubscriber<T, R>> = null;
  private start: T;
  private stop: T;

  constructor(
    destination: Subscriber<T>,
    private absoluteTimeout: boolean,
    private waitFor: number,
    private startSelector: (T) => boolean,
    private stopSelector: (start: T, current: T) => boolean,
    private withObservable: ((start: T) => Observable<R | T>)| ((start: T) =>T|R),
    private scheduler: SchedulerLike
  ) {
    super(destination);
    this.scheduleTimeout();
  }

  private static dispatchTimeout<T, R>(subscriber: TimeoutWithSubscriber<T, R>): void {
    const { withObservable } = subscriber;
    if (withObservable) {
      let o = withObservable(subscriber.start);
      if(o instanceof Observable) {
        (<any>subscriber)._unsubscribeAndRecycle();
        const sub = o.subscribe(subscriber);
        subscriber.add(sub);
      } else {
        subscriber._next(<T>o);
      }
    } else {
      (<any>subscriber)._unsubscribeAndRecycle();
    }
  }

  private scheduleTimeout(): void {
    const { action } = this;
    if (action) {
      // Recycle the action if we've already scheduled one. All the production
      // Scheduler Actions mutate their state/delay time and return themeselves.
      // VirtualActions are immutable, so they create and return a clone. In this
      // case, we need to set the action reference to the most recent VirtualAction,
      // to ensure that's the one we clone from next time.
      this.action = <SchedulerAction<TimeoutWithSubscriber<T, R>>>(
        action.schedule(this, this.waitFor)
      );
    } else {
      this.add(
        (this.action = <SchedulerAction<TimeoutWithSubscriber<T, R>>>(
          this.scheduler.schedule<TimeoutWithSubscriber<T, R>>(
            TimeoutWithSubscriber.dispatchTimeout,
            this.waitFor,
            this
          )
        ))
      );
    }
  }

  protected _next(value: T): void {
    if (this.startSelector(value)) {
      this.start = value;
      if (!this.absoluteTimeout) {
        this.scheduleTimeout();
      }
    }
    if (this.stopSelector(this.start, value)) {
      this.stop = value;
      this.action.unsubscribe();
    }

    super._next(value);
  }

  /** @deprecated This is an internal implementation detail, do not use. */
  _unsubscribe() {
    this.action = null;
    this.start = undefined;
    this.stop = undefined;
    this.scheduler = null;
    this.withObservable = null;
  }
}
