import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FileUploadComponent } from "../codemirror-editor/file-upload/file-upload.component";
import { GithubStorage } from "net-storage";
import { switchMap } from "rxjs/operators";
import { DOCUMENTS_FOLDER_NAME } from "app/modules/home/const";
import { HttpEvent, HttpEventType } from "@angular/common/http";
import { Subscription } from "rxjs";
import { IFileUploadData } from "./file-upload-data";
import { DocumentStore } from "app/modules/shared/store/document.store";

@Injectable({
  providedIn: "root",
})
export class FileUploadService {
  constructor(
    private _snackBar: MatSnackBar,
    private _github: GithubStorage,
    private _store: DocumentStore
  ) {}

  fileUploaded: (path: string) => void;

  upload(type: string) {
    let timer = null;
    let subscription: Subscription = null;
    const snackBar = this._snackBar.openFromComponent(FileUploadComponent, {
      data: <IFileUploadData>{
        accept: `${type}/*`,
        message: `pick ${type} to upload?`,
        action: "Ok",
        selectFile: () => clearTimeout(timer),
        cancelAction: () => {
          if (subscription) subscription.unsubscribe();
          console.log(`${type} uploading canceled`);
          setTimeout((_) => snackBar.dismiss(), 1000);
        },
        takeAction: (file: File, notifyProgress: (percent: number) => void) => {
          const reader = new FileReader();
          reader.onloadend = (_) => {
            const res = reader.result as String;
            const base64 = res.substr(res.indexOf(",") + 1);
            subscription = this._github
              .init()
              .pipe(
                switchMap((repo) => {
                  const id = this._store.currentId_.state;
                  const date = new Date().toISOString().replace(/[-:.]/g, "");
                  const path = `${DOCUMENTS_FOLDER_NAME}/${id}/${type}/${date}-${file.name}`;
                  return repo.newFileReportProgress(path, base64, true);
                })
              )
              .subscribe({
                next:(event: HttpEvent<any>) =>{
                  switch (event.type) {
                    case HttpEventType.UploadProgress:
                      const progress = Math.round(
                        (100 * event.loaded) / event.total
                      );
                      notifyProgress(progress);
                      break;
                    case HttpEventType.Response:
                      this.fileUploaded(event.body.content.download_url);
                      snackBar.dismiss();
                      break;
                    default:
                      // console.log(`Unhandled event: ${event.type}`)
                      break;
                  }
                },
                error: (err) =>{
                  snackBar.dismiss();
                  this._snackBar.open(err.error.message, "ok", {
                    duration: 2000,
                  });
                  console.error(err);
                },
              });
          };
          reader.readAsDataURL(file);
        },
      },
      duration: 0, // close by code
    });
    timer = setTimeout((_) => snackBar.dismiss(), 6000);
  }
}
