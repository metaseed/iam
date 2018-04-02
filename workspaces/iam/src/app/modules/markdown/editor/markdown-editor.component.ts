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
import { DocSaveCoordinateService } from "./services/doc-save-coordinate-service";
import { Observable } from "rxjs/Observable";
import { map, filter, switchMap, debounceTime, take } from "rxjs/Operators";
import { Store, select } from "@ngrx/store";
import { DialogService } from "core";
import { DocService } from "docs";
import { DocDirtyNotifyDialog } from "./doc-dirty-notify-dialog";
import { MatDialog } from "@angular/material";
import { Subscription } from "rxjs";

@Component({
  selector: "ms-markdown-editor",
  template: `
    <codemirror [(ngModel)]="markdown"></codemirror>
    <sk-cube-grid [isRunning]="!editorLoaded"></sk-cube-grid>
    `,
  styles: []
})
export class MarkdownEditorComponent implements OnInit {
  docModeSubs: Subscription;
  editorLoadedSubs: Subscription;
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
    private dialog: MatDialog,
    private editorService: MarkdownEditorService,
    private docSaveCoordinater: DocSaveCoordinateService,
    private store: Store<markdown.State>,
    private docSerivce: DocService
  ) {
    this.editorLoadedSubs = editorService.editorLoaded$.subscribe(() => {
      setTimeout(() => (this.editorLoaded = true), 0);
    });

    this.docModeSubs = this.docMode$.subscribe(mode => {
      switch (mode) {
        case DocumentMode.Edit: {
          setTimeout(() => this.codeMirrorComponent.refresh(), 0);

          break;
        }
      }
    });
  }

  ngOnInit() {}
  ngOnDestroy() {
    this.editorLoadedSubs.unsubscribe();
    this.docModeSubs.unsubscribe();
  }

  canDeactivate(): Observable<boolean> | boolean {
    return this.docSaveCoordinater.isDirty$.pipe(
      debounceTime(500),
      switchMap(value => {
        if (value) {
          return this.dialog
            .open(DocDirtyNotifyDialog)
            .afterClosed()
            .pipe(
              map(value => {
                if (value === "Yes") {
                  this.docSerivce.save(this.codeMirrorComponent.value);
                  return false;
                } else {
                  return true;
                }
              })
            );
        }
        return Observable.of(true);
      }),
      take(1)
    );
  }
}
