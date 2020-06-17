import { Component, OnInit, Inject, ViewChild, ElementRef, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'ms-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploadComponent implements OnInit {

  progress = 0;
  constructor(private ref: ChangeDetectorRef, @Inject(MAT_SNACK_BAR_DATA) public data: any) {
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
    this.data.takeAction(this.selectedFile, percent => {
      this.progress = percent;
      this.ref.markForCheck();
    });
  }

  action() {
    this.imageUpload.nativeElement.click(); // show file selection dialog;
  }
}

