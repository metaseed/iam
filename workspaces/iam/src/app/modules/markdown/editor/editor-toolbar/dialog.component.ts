import { Component, ViewChild } from "@angular/core";
import { MdcDialogRef, MdcDialogComponent } from "@angular-mdc/web";

@Component({
  template: `
    <mdc-dialog #dialog>
      <mdc-dialog-header>
        <mdc-dialog-header-title>
          Select Key Map
        </mdc-dialog-header-title>
      </mdc-dialog-header>
      <mdc-dialog-body>
      <mdc-list #singleline (selectionChange)="selectionChanged($event)">
      <mdc-list-item>default</mdc-list-item>
      <mdc-list-item>vim</mdc-list-item>
      <mdc-list-item>emacs</mdc-list-item>
      <mdc-list-item>sublime</mdc-list-item>
    </mdc-list>
      </mdc-dialog-body>
    </mdc-dialog>
    `
})
export class KeyMapSelectionDialog {
  @ViewChild("myDialog") myDialog: MdcDialogComponent;
  constructor(public dialogRef: MdcDialogRef<KeyMapSelectionDialog>) {}

  selectionChanged(change) {
    console.log(change);
  }
}
