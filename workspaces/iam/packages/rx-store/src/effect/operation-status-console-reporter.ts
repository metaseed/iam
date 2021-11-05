import { tap } from "rxjs";
import { OperationStatusReporter } from "./operation-status-reporter.interface";
import { OperationState } from "./operation-state";
import { OperationStep } from "./operation-status";
import { isDevMode } from "../core/dev-mode-checking";

export class OperationStatusConsoleReporter implements OperationStatusReporter {

  constructor(private enableInProdEnvironment = false) {
  }

  setup(operationStatusStore: OperationState) {
    if(!isDevMode() && !this.enableInProdEnvironment){
      return;
    }
    const icons =
      ['💖', '🧾', '🔖', '📘', '🎉', '😉', '📚', '👻', '👀', '✌',
        '✨', '🎨', '⚽', '🎁', '🎗', '🎞', '🧧', '🎇', '🥼', '🛒',
        '👙', '👜', '🎭', '🎀', '🎄', '💎', '🧩', '☎', '🎃', '🏈']

    operationStatusStore.ofStep(OperationStep.Start).pipe(tap((status) => {
      const icon = icons[status.coId! % icons.length]
      console.groupCollapsed(`%c${status.id}${icon}->start`, 'background-color:#abdcfb; color: black');
      console.log(status)
      console.groupEnd();
    })).subscribe();

    operationStatusStore.ofStep(OperationStep.Continue).pipe(tap((status) => {
      const icon = icons[status.coId! % icons.length]
      console.groupCollapsed(`%c${status.id}${icon}->continue`, 'background-color:purple; color: white');
      console.count(`${status.id}->continue`);
      console.log(status);
      console.groupEnd();
    })).subscribe();

    operationStatusStore.ofStep(OperationStep.Retry).pipe(tap((status) => {
      const icon = icons[status.coId! % icons.length]
      console.groupCollapsed(`%c${status.id}${icon}->retry`, 'background-color:#ffdc00; color: black');
      console.log(status)
      console.groupEnd();

    })).subscribe();

    operationStatusStore.ofStep(OperationStep.Timeout).pipe(tap((status) => {
      const icon = icons[status.coId! % icons.length]
      console.groupCollapsed(`%c${status.id}${icon}->timeout`, 'background-color:darkorange; color: white');
      console.warn(status);
      console.groupEnd();
    })).subscribe();

    operationStatusStore.ofStep(OperationStep.Fail).pipe(tap((status) => {
      const icon = icons[status.coId! % icons.length]
      console.groupCollapsed(`%c${status.id}${icon}->fail`, 'background-color:red; color: white');
      console.error(status); // assume it's an Error object
      console.groupEnd();

    })).subscribe();

    operationStatusStore.ofStep(OperationStep.Success).pipe(tap((status) => {
      const icon = icons[status.coId! % icons.length]
      const id = status.id;
      const msg = `${id}${icon}->success`;
      console.groupCollapsed(`%c${msg}`, 'background-color:#bada55; color: black');
      console.log(status);
      console.count(msg);
      console.groupEnd();
    })).subscribe();
  }

}
