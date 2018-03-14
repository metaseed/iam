import "rxjs/add/observable/of";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { MdcDialog } from "@angular-mdc/web";
import { SimpleDialog } from "./simple-dialog";
import { map } from "rxjs/operators";
/**
 * Async modal dialog service
 * DialogService makes this app easier to test by faking this service.
 * TODO: better modal implementation that doesn't use window.confirm
 */
@Injectable()
export class DialogService {
  constructor(private dialog: MdcDialog) {}
  confirm(message?: string): Observable<boolean> {
    // const confirmation = window.confirm(message || "Is it OK?");
    let ref = this.dialog.open(SimpleDialog, {
      escapeToClose: true,
      clickOutsideToClose: true
    });

    return ref.beforeClose().pipe(
      map(r => {
        return r === true;
      })
    );
  }
}
