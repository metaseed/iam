import { Injectable } from "@angular/core";
import { OperationStatusConsoleReporter, OperationStatusStore } from "@metaseed/rx-store";

@Injectable({providedIn:'root'})
export class OperationStatus extends OperationStatusStore {
  constructor(){
    super();
    new OperationStatusConsoleReporter(this);
  }
}
