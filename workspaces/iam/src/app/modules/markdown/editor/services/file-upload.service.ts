import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileUploadComponent } from '../codemirror-editor/file-upload/file-upload.component';
import { GithubStorage } from 'net-storage';
import { switchMap, tap } from 'rxjs/operators';
import { State } from '@ngrx/store';
import { SharedState, selectCurrentDocumentIdState } from 'shared';
import { DOCUMENTS_FOLDER_NAME } from 'app/modules/home/const';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(
    private _snackBar: MatSnackBar,
    private _github: GithubStorage,
    private state: State<SharedState>
  ) { }

  fileUploaded: (path: string) => void

  upload(type: string) {
    let timer = null;
    const snackBar = this._snackBar.openFromComponent(FileUploadComponent, {
      data: {
        accept: 'image/*',
        message: `pick ${type} to upload?`,
        action: 'Ok',
        selectFile: () => clearTimeout(timer),
        takeAction: (file: File, notifyProgress: (percent: number) => void) => {
          const reader = new FileReader();
          reader.onloadend = _ => {
            const res = reader.result as String;
            const base64 = res.substr(res.indexOf(',') + 1);
            this._github.init().pipe(switchMap(repo => {
              const id = selectCurrentDocumentIdState(this.state.value);
              const path = `${DOCUMENTS_FOLDER_NAME}/${id}/${type}/${file.name}`;
              return repo.newFileReportProgress(path, base64, true)
            })).subscribe((event: HttpEvent<any>) => {
              switch (event.type) {
                case HttpEventType.UploadProgress:
                  const progress = Math.round(100 * event.loaded / event.total);
                  notifyProgress(progress);
                  break;
                case HttpEventType.Response:
                  this.fileUploaded(event.body.content.download_url);
                  setTimeout(_ => snackBar.dismiss(), 800);
                  break;
                default:
                  // console.log(`Unhandled event: ${event.type}`)
                  break;
              }
            }, err => {
              snackBar.dismiss();
              this._snackBar.open(err.error.message, 'ok', {
                duration: 2000,
              });
              console.error(err)
            });
          };
          reader.readAsDataURL(file);
        }
      },
      duration: 0 // close by code
    });
    timer = setTimeout(_ => snackBar.dismiss(), 6000);
  }
}
