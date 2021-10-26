import { tap } from "rxjs";
import { OperationStatusReporter } from "./operation-status-reporter.interface";
import { OperationState } from "./operation-state";

export class OperationStatusConsoleReporter implements OperationStatusReporter {
  setup(operationStatusStore: OperationState) {

    operationStatusStore.start$.pipe(tap((status) => {
      console.log(`%c${status.id}->start`, 'background-color:#4285f4');
    })).subscribe();

    operationStatusStore.continue$.pipe(tap((status) => {
      console.groupCollapsed(`%c${status.id}->continue`, 'background-color:#4285f4');
      console.count(`${status.id}->continue`);
      console.log('result:', status.context);
      console.groupEnd();
    })).subscribe();

    operationStatusStore.retry$.pipe(tap((status) => {
      console.log(`%c${status.id}->retry`, 'background-color:#4285f4');
    })).subscribe();

    operationStatusStore.fail$.pipe(tap((status) => {
      console.log(`%c${status.id}->fail`, 'background-color:#F00');
      console.error(status.context); // assume it's an Error object
    })).subscribe();

    operationStatusStore.complete$.pipe(tap((status) => {
      const id = status.id;
      const msg = `${id}->complete`;
      console.groupCollapsed(`%c${msg}`, 'background-color:#4285f4');
      console.count(msg);
      console.groupEnd();
    })).subscribe();
  }

}
