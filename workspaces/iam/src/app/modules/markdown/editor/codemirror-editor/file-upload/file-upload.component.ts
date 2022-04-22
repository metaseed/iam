import {
  Component,
  Inject,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from "@angular/core";
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from "@angular/material/snack-bar";
import { MatProgressBar } from "@angular/material/progress-bar";
import { IFileUploadData } from "../../services/file-upload-data";

@Component({
  selector: "ms-file-upload",
  templateUrl: "./file-upload.component.html",
  styleUrls: ["./file-upload.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class FileUploadComponent {
  progressPercent = 0;
  accept = "image/*";
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: IFileUploadData,
    private snackBarRef: MatSnackBarRef<FileUploadComponent>
  ) {
    this.data.notifyProgress = this.notifyProgress.bind(this);
    this.accept = data.accept;
  }

  @ViewChild("imageUpload")
  imageUpload: ElementRef;

  @ViewChild("progress")
  progressBar: MatProgressBar;

  private selectedFile: File;
  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    this.data.showMessage = false;
    this.data.action = "cancel";
    this.data.takeAction?.(this.selectedFile);
  }

  notifyProgress(percent: number) {
    this.progressPercent = percent;
  }

  get hasAction(): boolean {
    return !!this.data.action;
  }

  action() {
    if (this.data.action === "cancel") {
      this.data.cancelAction();
      return;
    }

    this.imageUpload.nativeElement.click(); // show file selection dialog;
    this.data.selectFile?.();
    this.data.action = 'cancel';
  }
}
