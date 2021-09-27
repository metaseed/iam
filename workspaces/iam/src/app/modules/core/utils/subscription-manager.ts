import { OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";

type Constructor<T> = new (...args: any[]) => T;

/**
 * mixin function of subscription management to Angular Component:
 * automatically unsubscribe the added subs when component destroyed
 *
 * this function is used when component has extended another base class.
 *
 * @param Base the base class of the component
 *
 * @example
 * class MyComponent extends ManageSubscription(Base)
 *
 * Note: if the component implements OnDestroy, do remember calling super.ngOnDestroy()
 */
export function ManageSubscription<T extends Constructor<{ ngOnDestroy?() }>>(Base: T) {
  return class extends Base implements OnDestroy {
    public subscriptions: Subscription[] = [];

    public ngOnDestroy(): void {
      super.ngOnDestroy?.();
      this.unsubscribe();
    }

    public addSub<S>(...subs: (Subscription | Observable<S>)[]) {
      for (const sub of subs) {
        if (sub instanceof Subscription) {
          this.subscriptions.push(sub);
        } else {
          this.subscriptions.push(
            sub.subscribe({
              error(e) {
                // eslint-disable-next-line no-console
                console.error(e);
              },
            }),
          );
        }
      }

      return this;
    }

    public unsubscribe() {
      for (const sub of this.subscriptions) {
        sub.unsubscribe();
      }

      this.subscriptions = [];
    }
  };
}

/**
 * base class of Angular Component that has observable subscription management function:
 * automatically unsubscribe the added subs when component destroyed
 *
 * if the component has another base class to extend, use: ManageSubscription(Base)
 *
 * @example
 * class DriverConfigComponent extends SubscriptionManager
 *
 * Note: if the component implements OnDestroy, do remember calling super.ngOnDestroy()
 */
export const SubscriptionManager = ManageSubscription(Object);
