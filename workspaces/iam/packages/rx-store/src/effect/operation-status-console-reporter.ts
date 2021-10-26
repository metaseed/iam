import { tap } from "rxjs";
import { OperationStatusReporter } from "./operation-status-reporter.interface";
import { OperationState } from "./operation-state";
import { OperationStep } from ".";

export class OperationStatusConsoleReporter implements OperationStatusReporter {
  setup(operationStatusStore: OperationState) {

    operationStatusStore.ofStep(OperationStep.Start).pipe(tap((status) => {
      console.log(`%c${status.id}->start`, 'background-color:#4285f4');
    })).subscribe();

    operationStatusStore.ofStep(OperationStep.Continue).pipe(tap((status) => {
      console.groupCollapsed(`%c${status.id}->continue`, 'background-color:#4285f4');
      console.count(`${status.id}->continue`);
      console.log('result:', status.context);
      console.groupEnd();
    })).subscribe();

    operationStatusStore.ofStep(OperationStep.Retry).pipe(tap((status) => {
      console.log(`%c${status.id}->retry`, 'background-color:#4285f4');
    })).subscribe();

    operationStatusStore.ofStep(OperationStep.Fail).pipe(tap((status) => {
      console.log(`%c${status.id}->fail`, 'background-color:#F00');
      console.error(status.context); // assume it's an Error object
    })).subscribe();

    operationStatusStore.ofStep(OperationStep.Success).pipe(tap((status) => {
      const id = status.id;
      const msg = `${id}->Success`;
      console.groupCollapsed(`%c${msg}`, 'background-color:#4285f4');
      console.count(msg);
      console.groupEnd();
    })).subscribe();
  }

}
