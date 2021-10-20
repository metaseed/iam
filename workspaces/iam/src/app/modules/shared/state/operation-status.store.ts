import { Injectable } from "@angular/core";
import { OperationStatusConsoleReporter, OperationStatusStore } from "packages/rx-store/src/core";

@Injectable({providedIn:'root'})
export class OperationStatus extends OperationStatusStore {
  constructor(){
    super();
    new OperationStatusConsoleReporter(this);
  }
}
