import { EffectStateObservable } from "./effect-state-observable";
import { OperationStatusReporter } from "./operation-status-reporter.interface";

type Constructor<T> = new (...args: any[]) => T;

export function MixinEffectManager<T extends Constructor<{}>> (Base: T) {
  return class extends Base {
    addReporter(reporter: OperationStatusReporter, hiddenEffects?: string[]) {
      let effect: EffectStateObservable<any>;
      for (const [key,effect] of Object.entries(this)) {
        if (effect.operationStatus$ && (!hiddenEffects || !hiddenEffects.includes(key))) {
          effect.operationStatus$.addReporter(reporter);
        }
      }
    }
  }
}

export const EffectManager = MixinEffectManager(Object);
