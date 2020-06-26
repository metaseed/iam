import { Component, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  template: `
        <h1 mat-dialog-title>
        Delete?
        </h1>
<div mat-dialog-content>
  <p>
  Are you want delete this document?
  </p>
</div>
<div mat-dialog-actions>
<button mat-button [mat-dialog-close]="'Cancel'">Cancel</button>
<button mat-button [mat-dialog-close]="'Yes'">Yes</button>
</div>
    `
})
export class DeleteAlertDialogComponent {
  constructor(public dialogRef: MatDialogRef<DeleteAlertDialogComponent>) {}
}
