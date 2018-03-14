import { Component, Inject } from "@angular/core";
import { MdcDialogRef, MdcDialogComponent } from "@angular-mdc/web";

@Component({
  template: `
  <mdc-dialog style="z-index:1000;" #myDialog>
    <mdc-dialog-header>
      <mdc-dialog-header-title>
        Use Google's location service?
      </mdc-dialog-header-title>
    </mdc-dialog-header>
    <mdc-dialog-body>
      Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
    </mdc-dialog-body>
    <mdc-dialog-footer>
      <button mdc-dialog-button [cancel]="true">Decline</button>
      <button mdc-dialog-button [accept]="true">Accept</button>
    </mdc-dialog-footer>
  </mdc-dialog>
  `
})
export class SimpleDialog {
  @ViewChild("myDialog") myDialog: MdcDialogComponent;
  constructor(public dialogRef: MdcDialogRef<SimpleDialog>) {}
}
