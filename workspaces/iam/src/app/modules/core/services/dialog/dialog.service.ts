import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { race, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
/**
 * Async modal dialog service
 * DialogService makes this app easier to test by faking this service.
 * TODO: better modal implementation that doesn't use window.confirm
 */
@Injectable()
export class DialogService {
  constructor(private dialog: MatDialog) {}
  confirm(dialogComponent): Observable<boolean> {
    // const confirmation = window.confirm(message || "Is it OK?");
    let ref = this.dialog.open(dialogComponent, {
      disableClose: true
    });
    return (<any>ref.componentInstance).dialog._accept
      .pipe(
        map(() => {
          return true;
        })
      )
      .race(
        (<any>ref.componentInstance).dialog._cancel.pipe(
          map(() => {
            return false;
          })
        )
      );
  }
}
