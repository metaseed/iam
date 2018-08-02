import { Component, ViewChild, Inject, ElementRef } from '@angular/core';
import { MarkdownEditorService } from '.';
import { CodemirrorComponent } from './codemirror-editor/codemirror.component';
import * as fromMarkdown from '../state';
import { DocumentMode } from '../state/reducers/document';
import { DocSaveCoordinateService } from './services/doc-save-coordinate-service';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Store, select, State as StoreState } from '@ngrx/store';
import { DocDirtyNotifyDialog } from './doc-dirty-notify-dialog';
import { MatDialog } from '@angular/material';
import { of } from 'rxjs';
import {
  DocumentEffectsSave,
  selectCurrentDocumentIdState,
  DocumentEffectsDelete,
  selectCurrentDocumentState,
  NEW_DOC_ID
} from 'shared';
import { IMarkdownService, MARKDOWN_SERVICE_TOKEN } from '../model/markdown.model';
import { IContainer, ContainerRef } from 'core';

@Component({
  selector: 'ms-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.scss']
})
export class MarkdownEditorComponent {
  editorLoaded = false;
  destroy$ = new Subject();
  DocumentMode = DocumentMode;

  @ViewChild(CodemirrorComponent) codeMirrorComponent: CodemirrorComponent;

  docMode$ = this.store.pipe(select(fromMarkdown.selectDocumentModeState));

  markdown$ = this.store.select(selectCurrentDocumentState).pipe(
    map(doc => {
      if (doc && doc.content) {
        return doc.content.content;
      } else {
        return '';
      }
    })
  );

  constructor(
    private _elementRef: ElementRef,
    private state: StoreState<fromMarkdown.State>,
    private dialog: MatDialog,
    @Inject(MARKDOWN_SERVICE_TOKEN) public markdownService: IMarkdownService,
    private editorService: MarkdownEditorService,
    private docSaveCoordinater: DocSaveCoordinateService,
    private store: Store<fromMarkdown.State>
  ) {
    this.editorService.editorLoaded$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      setTimeout(() => (this.editorLoaded = true), 0);
    });
    this.editorService.contentChanged$
      .pipe(
        takeUntil(this.destroy$),
        map(v => v[0])
      )
      .subscribe(this.markdownService.editorContentChanged$ as Subject<string>);

    this.docMode$.pipe(takeUntil(this.destroy$)).subscribe(mode => {
      switch (mode) {
        case DocumentMode.Edit: {
          setTimeout(() => this.codeMirrorComponent.refresh(), 0);

          break;
        }
      }
    });
  }

  ngOnInit() {
    (this.markdownService.editor$ as Subject<IContainer>).next(
      new ContainerRef(this._elementRef.nativeElement)
    );
  }

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
