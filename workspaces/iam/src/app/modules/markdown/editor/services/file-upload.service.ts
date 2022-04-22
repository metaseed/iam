import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarRef } from "@angular/material/snack-bar";
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

  public uploadSelected(type: string) {
    const showMessage = true, action = 'OK';
    let timer = null;
    let subscription: Subscription = null;
    let resolve = null; let reject = null;
    const promise = new Promise<string>((res, rej) => { resolve = res; reject = rej; });
    const data: IFileUploadData = {
      accept: `${type}/*`,
      showMessage,
      message: `pick ${type} to upload?`,
      action,
      selectFile: () => clearTimeout(timer),
      cancelAction: () => {
        if (subscription) subscription.unsubscribe();
        console.log(`${type} uploading canceled`);
        reject('canceled');
        setTimeout((_) => snackBar.dismiss(), 1000);
      },
      takeAction: file => this.doUpload(file, data, type, snackBar).then(resolve, reject),
    }
    const snackBar = this._snackBar.openFromComponent(FileUploadComponent, {
      data,
      duration: 0, // close by code
    });
    timer = setTimeout((_) => { reject('timeout'); snackBar.dismiss(); }, 10000);

    return promise;
  }

  uploadFile(subFolder: string, file: File) {
    const [snackBar, data] = this.showProgress();
    return this.doUpload(file, data, subFolder, snackBar);
  }

  private doUpload = (file: File, data: IFileUploadData, subFolder: string, snackBar: MatSnackBarRef<FileUploadComponent>) => {
    const reader = new FileReader();
    let resolve = null; let reject = null;
    const promise = new Promise<string>((res, rej) => {
      resolve = res;
      reject = rej;
    })

    reader.onloadend = (_) => {
      const res = reader.result as String;
      const base64 = res.substring(res.indexOf(",") + 1);
      return this._github
        .init()
        .pipe(
          switchMap((repo) => {
            const id = this._store.currentId_.state;
            const date = new Date().toISOString().replace(/[-:.]/g, "");
            const path = `${DOCUMENTS_FOLDER_NAME}/${id}/${subFolder}/${date}-${file.name}`;
            return repo.newFileReportProgress(path, base64, true);
          })
        )
        .subscribe({
          next: (event: HttpEvent<any>) => {
            switch (event.type) {
              case HttpEventType.UploadProgress:
                const progress = Math.round(
                  (100 * event.loaded) / event.total
                );
                data.notifyProgress?.(progress);
                break;
              case HttpEventType.Response:
                resolve(event.body.content.download_url);
                snackBar.dismiss();
                break;
              default:
                // console.log(`Unhandled event: ${event.type}`)
                break;
            }
          },
          error: (err) => {
            snackBar.dismiss();
            this._snackBar.open(err.error.message, "ok", {
              duration: 2000,
            });
            reject(err);
            console.error(err);
          },
        });
    };

    reader.readAsDataURL(file);
    return promise;
  }

  private showProgress(): [MatSnackBarRef<FileUploadComponent>, IFileUploadData] {
    let subscription: Subscription = null;
    const showMessage = false;
    const action = 'Cancel';

    const data: IFileUploadData = {
      showMessage,
      action,
      cancelAction: () => {
        if (subscription) subscription.unsubscribe();
        console.log(`uploading canceled`);
        setTimeout((_) => snackBar.dismiss(), 1000);
      }
    }
    const snackBar = this._snackBar.openFromComponent(FileUploadComponent, {
      data,
      duration: 0, // close by code
    });
    return [snackBar, data];
  }

}
