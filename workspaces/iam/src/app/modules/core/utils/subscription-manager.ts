import { OnDestroy } from "@angular/core";
import { isObservable } from "rxjs";
import { TeardownLogic } from "rxjs";
import { Observable, Subscription } from "rxjs";

type Constructor<T> = new (...args: any[]) => T;

/**
 * mixin function of subscription management to Angular Destroyable(Component, Pipe, Directive, Service):
 * automatically unsubscribe the added subs when destroyable destroyed
 *
 * this function is used when the Destroyable has extended another base class.
 *
 * @param Base the base class of the Destroyable
 *
 * @example
 * class MyComponent extends ManageSubscription(Base)
 *
 * Note: if the component implements OnDestroy, do remember calling super.ngOnDestroy()
 */
export function ManageSubscription<T extends Constructor<any>>(Base: T) {
  return class extends Base implements OnDestroy {
    private __subscription = new Subscription();

    public ngOnDestroy(): void {
      super.ngOnDestroy?.();
      this.unsubscribe();
    }

    public addSub<S>(...subs: (TeardownLogic | Observable<S>)[]) {
      for (const sub of subs) {
        if (isObservable(sub)) {
          this.__subscription.add(
            sub.subscribe({
              error(e) {
                console.error(e);
              },
            }),
          );
        } else {
          this.__subscription.add(sub);
        }
      }

      return this;
    }

    public addObs<S>(source: Observable<S>) {
      const sub = source.subscribe({
        error(e) {
          console.error(e);
        },
      });

      this.__subscription.add(sub);

      return sub;
    }

    public removeSub(...subs: Exclude<TeardownLogic, void>[]) {
      for (const sub of subs) {
        this.__subscription.remove(sub);
      }
    }

    public unsubscribe() {
      this.__subscription.unsubscribe();
    }
  };
}

/**
 * base class of Angular Destroyable(Component, Pipe, Directive, Service) that has observable subscription management function:
 * automatically unsubscribe the added subs when Destroyable destroyed
 *
 * if the Destroyable has another base class to extend, use: ManageSubscription(Base)
 *
 * @example
 * class DriverConfigComponent extends SubscriptionManager
 *
 * Note: if the component implements OnDestroy, do remember calling super.ngOnDestroy()
 */
export const SubscriptionManager = ManageSubscription(Object);
