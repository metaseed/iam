/* eslint-disable max-classes-per-file */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

// Requires a transparent css in parent or global stylesheet e.g.:
// #DialogSpinnerComponent {
//   box-shadow: none !important;
//   background: transparent !important;
// }

@Component({
  selector: 'iam-app-do-not-use',
  template: `<mat-spinner></mat-spinner>`,
})
export class DialogSpinnerDialogComponent { }

@Component({
  selector: 'iam-dialog-spinner',
  template: ``,
})
export class DialogSpinnerComponent implements OnInit, OnDestroy {

  private dialog: MatDialogRef<DialogSpinnerDialogComponent>;

  constructor(
    private matDialog: MatDialog,
  ) { }

  public ngOnInit() {
    setTimeout(() => {
      this.dialog = this.matDialog.open(DialogSpinnerDialogComponent,
        {
          id: 'DialogSpinnerComponent',
          disableClose: true,
        });
    });
  }

  public ngOnDestroy() {
    setTimeout(() => {
      this.dialog.close();
    });
  }

}
