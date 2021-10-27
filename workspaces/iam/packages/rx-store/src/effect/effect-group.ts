import { OperationStatusReporter } from ".";
import { MonitoredStateObservable } from "./monitored-state-observable";

export class EffectGroup {
  addReporter(reporter: OperationStatusReporter){
    let effect: MonitoredStateObservable<any>;
    for( effect of Object.values(this)){
      if(effect.operationState){
        effect.operationState.addReporter(reporter);
      }
    }
  }
}
