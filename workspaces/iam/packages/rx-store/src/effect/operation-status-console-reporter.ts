import { tap } from "rxjs";
import { OperationStatusReporter } from "./operation-status-reporter.interface";
import { OperationState } from "./operation-state";
import { OperationStep } from "./operation-status";

export class OperationStatusConsoleReporter implements OperationStatusReporter {
  setup(operationStatusStore: OperationState) {
    const icons =
      ['💖', '🧾', '🔖', '📘', '🎉', '😉', '📚', '👻', '👀', '✌',
        '✨', '🎨', '⚽', '🎁', '🎗', '🎞', '🧧', '🎇', '🥼', '🛒',
        '👙', '👜', '🎭', '🎀', '🎄', '💎', '🧩', '☎', '🎃','🏈']

    operationStatusStore.ofStep(OperationStep.Start).pipe(tap((status) => {
      const icon = icons[status.coId! % icons.length]
      console.groupCollapsed(`%c${status.id}->start${icon}`, 'background-color:#abdcfb; color: black');
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

      console.groupCollapsed(`%c${status.id}->retry`, 'background-color:#ffdc00; color: black');
      console.log(status)
      console.groupEnd();

    })).subscribe();

    operationStatusStore.ofStep(OperationStep.Timeout).pipe(tap((status) => {
      console.groupCollapsed(`%c${status.id}->timeout`, 'background-color:darkorange; color: white');
      console.warn(status);
      console.groupEnd();
    })).subscribe();

    operationStatusStore.ofStep(OperationStep.Fail).pipe(tap((status) => {
      console.groupCollapsed(`%c${status.id}->fail`, 'background-color:red; color: white');
      console.error(status); // assume it's an Error object
      console.groupEnd();

    })).subscribe();

    operationStatusStore.ofStep(OperationStep.Success).pipe(tap((status) => {
      const icon = icons[status.coId! % icons.length]
      const id = status.id;
      const msg = `${id}->Success${icon}`;
      console.groupCollapsed(`%c${msg}`, 'background-color:#bada55; color: black');
      console.log(status);
      console.count(msg);
      console.groupEnd();
    })).subscribe();
  }

}
