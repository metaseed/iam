import { Component, OnInit, Input, Output, ViewChild } from "@angular/core";
import { MarkdownEditorService } from "./index";
import { setTimeout } from "timers";
import { MonacoEditorComponent } from "./monaco-editor/monaco-editor.component";
import { EventEmitter } from "@angular/core";
import { Scrollable } from "core";
import * as markdown from "../reducers";
import * as fromEdit from "../actions/edit";
import { CodemirrorComponent } from "./codemirror-editor/codemirror.component";
import * as fromMarkdown from "./../reducers";
import { DocumentMode } from "./../reducers/document";
import { Store, select } from "@ngrx/store";
import { DocSaveCoordinateService } from "./services/doc-save-coordinate-service";
import { Observable } from "rxjs/Observable";
import { DialogService } from "common";
import { DocService } from "docs";
import { map, filter } from "rxjs/Operators";
import { pipe } from "rxjs";
import { switchMap } from "rxjs/operators";
import { DocDirtyNotifyDialog } from "./doc-dirty-notify-dialog";
@Component({
  selector: "ms-markdown-editor",
  template: `
    <codemirror [(ngModel)]="markdown"></codemirror>
    <sk-cube-grid [isRunning]="!editorLoaded"></sk-cube-grid>
    `,
  styles: []
})
export class MarkdownEditorComponent implements OnInit {
  editorLoaded = false;

  @Output() markdownChange = new EventEmitter();

  @ViewChild(CodemirrorComponent) codeMirrorComponent: CodemirrorComponent;

  docMode$ = this.store.pipe(select(fromMarkdown.selectDocumentModeState));

  _markdown: string;
  @Input()
  get markdown(): string {
    return this._markdown;
  }
  set markdown(value) {
    this._markdown = value;
    this.markdownChange.emit(value);
  }

  constructor(
    private _dialogService: DialogService,
    private _service: MarkdownEditorService,
    private docSaveCoordinater: DocSaveCoordinateService,
    private store: Store<markdown.State>,
    private docSerivce: DocService
  ) {
    _service.editorLoaded$.subscribe(() => {
      setTimeout(() => (this.editorLoaded = true), 0);
    });

    this.docMode$.subscribe(mode => {
      switch (mode) {
        case DocumentMode.Edit: {
          setTimeout(() => this.codeMirrorComponent.refresh(), 0);

          break;
        }
      }
    });
  }

  ngOnInit() {}

  canDeactivate(): Observable<boolean> | boolean {
    return this.docSaveCoordinater.isDirty$.pipe(
      switchMap(value => {
        if (value) {
          return this._dialogService.confirm(DocDirtyNotifyDialog).pipe(
            map(value => {
              if (value) {
                this.docSerivce.save(this.codeMirrorComponent.value);
                return false;
              } else {
                return true;
              }
            })
          );
        }
        return Observable.of(true);
      })
    );
  }
}
