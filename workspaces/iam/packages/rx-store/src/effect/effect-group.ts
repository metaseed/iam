import { OperationStatusReporter } from ".";
import { EffectStateObservable } from "./effect-state-observable";

export class EffectGroup {
  addReporter(reporter: OperationStatusReporter){
    let effect: EffectStateObservable<any>;
    for( effect of Object.values(this)){
      if(effect.operationStatus$){
        effect.operationStatus$.addReporter(reporter);
      }
    }
  }
}
