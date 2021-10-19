import { tap } from "rxjs";
import { OperationStatusStore } from "./operation-status.store";

export class OperationStatusConsoleReporter {
  constructor(operationStatusStore: OperationStatusStore) {
    operationStatusStore.start$.pipe(tap((status) => {
      console.log(`%c${status.type}-${status.coId}->start`, 'background-color:#4285f4');
    })).subscribe();

  //   operationStatusStore.complete$.pipe(tap((status) => {
  //     console.log(`%c${status.type}-${status.coId}->start`, 'background-color:#4285f4');
  //   })).subscribe();

  //   operationStatusStore.start$.pipe(tap((status) => {
  //     console.log(`%c${status.type}-${status.coId}->start`, 'background-color:#4285f4');
  //   })).subscribe();
  // }

}
