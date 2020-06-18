import { Component, OnInit, Inject, ViewChild, ElementRef, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'ms-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FileUploadComponent implements OnInit {

  progressPercent = 0;
  showMessage = true;
  accept = 'image/*';
  constructor( @Inject(MAT_SNACK_BAR_DATA) public data: any,
   private snackBarRef: MatSnackBarRef<FileUploadComponent>) {
    this.accept = data.accept;
  }

  @ViewChild('imageUpload')
  imageUpload: ElementRef;

  @ViewChild('progress')
  progressBar: MatProgressBar;

  ngOnInit(): void {
  }

  private selectedFile: string;
  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    this.showMessage = false;
    this.data.takeAction(this.selectedFile, percent => {
      this.progressPercent = percent;
    });
  }
  get hasAction(): boolean {
    return !!this.data.action;
  }
  action() {
    this.data.selectFile();
    // this.snackBarRef.dismissWithAction();
    this.imageUpload.nativeElement.click(); // show file selection dialog;
  }
}

