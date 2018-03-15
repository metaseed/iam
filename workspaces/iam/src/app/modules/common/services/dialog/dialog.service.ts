import "rxjs/add/observable/of";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { MdcDialog } from "@angular-mdc/web";
import { map } from "rxjs/operators";
import { race } from "rxjs/observable/race";
/**
 * Async modal dialog service
 * DialogService makes this app easier to test by faking this service.
 * TODO: better modal implementation that doesn't use window.confirm
 */
@Injectable()
export class DialogService {
  constructor(private dialog: MdcDialog) {}
  confirm(dialogComponent): Observable<boolean> {
    // const confirmation = window.confirm(message || "Is it OK?");
    let ref = this.dialog.open(dialogComponent, {
      escapeToClose: true,
      clickOutsideToClose: true
    });
    return race(
      (<any>ref.componentInstance).dialog._accept.pipe(
        map(() => {
          return true;
        })
      ),
      (<any>ref.componentInstance).dialog._cancel.pipe(
        map(() => {
          return false;
        })
      )
    );
  }
}
