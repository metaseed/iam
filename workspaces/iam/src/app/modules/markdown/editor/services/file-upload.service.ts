import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileUploadComponent } from '../codemirror-editor/file-upload/file-upload.component';
import { GithubStorage } from 'net-storage';
import { switchMap, tap } from 'rxjs/operators';
import { State } from '@ngrx/store';
import { SharedState, selectCurrentDocumentIdState } from 'shared';
import { DOCUMENTS_FOLDER_NAME } from 'app/modules/home/const';
import { HttpEvent } from '@angular/common/http';

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
    const snackBar = this._snackBar.openFromComponent(FileUploadComponent, {
      data: {
        message: `pick ${type} to upload?`,
        action: 'Ok',
        takeAction: (file: File, notifyProgress: (percent: number) => void) => {
          // console.log(file);
          const reader = new FileReader();
          reader.onloadend = _ => {
            const res = reader.result as String;
            const base64 = res.substr(res.indexOf(',') + 1);
            this._github.init().pipe(switchMap(repo => {
              const id = selectCurrentDocumentIdState(this.state.value);
              const path = `${DOCUMENTS_FOLDER_NAME}/${id}/${type}/${file.name}`;
              return repo.newFile(path, base64, true, notifyProgress)
            })).subscribe((event:HttpEvent<any>) => {
              if(event.type)
              //this.fileUploaded(file.content.download_url);
              console.log('---------：：：：', event)
            }, err => console.error(err));
          };
          reader.readAsDataURL(file);
          snackBar.dismiss();
        }
      },
      duration: 0 // close by code
    });
    const timer = setTimeout(_ => snackBar.dismiss(), 5000);
    snackBar.afterOpened().subscribe(_ => clearTimeout(timer));
  }

  // this.http.post('my-backend.com/file-upload', this.selectedFile)
  //.subscribe(event => {
  // console.log(event); // progress 
  //});
}
