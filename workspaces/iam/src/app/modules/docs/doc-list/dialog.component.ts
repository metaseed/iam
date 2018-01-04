import { Component, ViewChild } from "@angular/core";
import { MdcDialogRef, MdcDialogComponent } from "@angular-mdc/web";

@Component({
  template: `
    <mdc-dialog #myDialog>
      <mdc-dialog-header>
        <mdc-dialog-header-title>
          Delete this document?
        </mdc-dialog-header-title>
      </mdc-dialog-header>
      <mdc-dialog-footer>
        <button mdc-dialog-button [cancel]="true">Cancel</button>
        <button mdc-dialog-button [action]="true" [accept]="true">Yes</button>
      </mdc-dialog-footer>
    </mdc-dialog>
    `,
})
export class DeleteAlertDialog {
  @ViewChild('myDialog') myDialog: MdcDialogComponent;
  constructor(
    public dialogRef: MdcDialogRef<DeleteAlertDialog>) { }
}