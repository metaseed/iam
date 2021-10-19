import { tap } from "rxjs";
import { OperationStatusReporter } from "./operation-status-reporter.interface";
import { OperationStatusStore } from "./operation-status.store";

export class OperationStatusConsoleReporter implements OperationStatusReporter {
  constructor(operationStatusStore: OperationStatusStore) {
    operationStatusStore.start$.pipe(tap((status) => {
      console.log(`%c${status.id}->start`, 'background-color:#4285f4');
    })).subscribe();

    operationStatusStore.complete$.pipe(tap((status) => {
      const id = status.id;
      const msg = `${id}->complete`;
      console.groupCollapsed(`%c${msg}`, 'background-color:#4285f4');
      console.count(msg);
      console.groupEnd();
    })).subscribe();

    operationStatusStore.error$.pipe(tap((status) => {
      console.log(`%c${status.id}->error`, 'background-color:#F00');
      console.error(status.context); // assume it's an Error object
    })).subscribe();

    operationStatusStore.continue$.pipe(tap((status) => {
      console.groupCollapsed(`%c${status.id}->succession`, 'background-color:#4285f4');
      console.count(`${status.id}->succession`);
      console.log('result:', status.context);
      console.groupEnd();
    })).subscribe();
  }

}
