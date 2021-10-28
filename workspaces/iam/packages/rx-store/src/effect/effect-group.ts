import { EffectStateObservable } from "./effect-state-observable";
import { OperationStatusReporter } from "./operation-status-reporter.interface";

type Constructor<T> = new (...args: any[]) => T;

export function MixinEffectGroup<T extends Constructor<{}>> (Base: T) {
  return class extends Base {
    addReporter(reporter: OperationStatusReporter) {
      let effect: EffectStateObservable<any>;
      for (effect of Object.values(this)) {
        if (effect.operationStatus$) {
          effect.operationStatus$.addReporter(reporter);
        }
      }
    }
  }
}

export const EffectGroup = MixinEffectGroup(Object);
