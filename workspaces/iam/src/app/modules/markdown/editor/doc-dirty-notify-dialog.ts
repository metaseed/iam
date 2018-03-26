import { Component, Inject, ViewChild } from "@angular/core";
import { MatDialogRef } from "@angular/material";

@Component({
  template: `
  <div style="z-index:1000">
  <h1 mat-dialog-title>Save?</h1>
<div mat-dialog-content>
  <p>
  Docuemnt modified, are you want to save?
  </p>
</div>
<div mat-dialog-actions>
  <button mat-button [mat-dialog-close]="'No'">No</button>
  <button mat-button [mat-dialog-close]="'Yes'" cdkFocusInitial>Yes</button>
</div>
</div>
  `
})
export class DocDirtyNotifyDialog {
  constructor(public dialogRef: MatDialogRef<DocDirtyNotifyDialog>) {}
}
