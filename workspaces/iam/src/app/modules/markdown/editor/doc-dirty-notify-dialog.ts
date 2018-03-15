import { Component, Inject, ViewChild } from "@angular/core";
import { MdcDialogRef, MdcDialogComponent } from "@angular-mdc/web";

@Component({
  template: `
  <mdc-dialog style="z-index:1000;" #myDialog>
    <mdc-dialog-header>
      <mdc-dialog-header-title>
        Save?
      </mdc-dialog-header-title>
    </mdc-dialog-header>
    <mdc-dialog-body>
      Docuemnt modified, are you want to save?
    </mdc-dialog-body>
    <mdc-dialog-footer>
      <button mdc-dialog-button [cancel]="true">No</button>
      <button mdc-dialog-button [accept]="true">Yes</button>
    </mdc-dialog-footer>
  </mdc-dialog>
  `
})
export class DocDirtyNotifyDialog {
  @ViewChild("myDialog") dialog: MdcDialogComponent;
  constructor(public dialogRef: MdcDialogRef<DocDirtyNotifyDialog>) {}
}
