import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import { MarkdownEditorService } from './index';
import { EventEmitter } from '@angular/core';
import { Scrollable } from 'core';
import * as fromEdit from '../state/actions/edit';
import { CodemirrorComponent } from './codemirror-editor/codemirror.component';
import * as fromMarkdown from './../state';
import { DocumentMode } from './../state/reducers/document';
import { DocSaveCoordinateService } from './services/doc-save-coordinate-service';
import { Observable, Subject } from 'rxjs';
import {
  map,
  filter,
  switchMap,
  debounceTime,
  take,
  takeUntil,
  distinctUntilChanged
} from 'rxjs/Operators';
import { Store, select, State as StoreState } from '@ngrx/store';
import { DialogService } from 'core';
import { DocService } from 'home';
import { DocDirtyNotifyDialog } from './doc-dirty-notify-dialog';
import { MatDialog } from '@angular/material';
import { Subscription, of } from 'rxjs';
import {
  DocumentEffectsSave,
  selectCurrentDocumentIdState,
  DocumentEffectsDelete
} from '../../home/state';
import { NEW_DOC_ID } from '../../home/const';

@Component({
  selector: 'ms-markdown-editor',
  template: `
    <codemirror [(ngModel)]="markdown"></codemirror>
    <sk-cube-grid [isRunning]="!editorLoaded"></sk-cube-grid>
    `,
  styles: []
})
export class MarkdownEditorComponent implements OnInit {
  editorLoaded = false;
  destroy$ = new Subject();

  @Output() markdownChange = new EventEmitter<string>();

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
    private state: StoreState<fromMarkdown.State>,
    private dialog: MatDialog,
    private editorService: MarkdownEditorService,
    private docSaveCoordinater: DocSaveCoordinateService,
    private store: Store<fromMarkdown.State>,
    private docSerivce: DocService
  ) {
    this.editorService.editorLoaded$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      setTimeout(() => (this.editorLoaded = true), 0);
    });

    this.docMode$.pipe(takeUntil(this.destroy$)).subscribe(mode => {
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
    this.destroy$.next();
  }

  canDeactivate(): Observable<boolean> {
    const deleteNewDoc = () => {
      const id = selectCurrentDocumentIdState(this.state.value);
      if (id === NEW_DOC_ID) {
        this.store.dispatch(new DocumentEffectsDelete({ id }));
      }
    };
    if (this.docSaveCoordinater.isDirty$.value) {
      return this.dialog
        .open(DocDirtyNotifyDialog)
        .afterClosed()
        .pipe(
          map(value => {
            if (value === 'Yes') {
              this.store.dispatch(
                new DocumentEffectsSave({ content: this.codeMirrorComponent.value })
              );
              return false;
            } else {
              deleteNewDoc();
              return true;
            }
          })
        );
    } else {
      deleteNewDoc();
      return of(true);
    }
  }
}
