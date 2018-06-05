import { Injectable, OnDestroy } from '@angular/core';
import { Document } from '../../../docs/models/document';
import { MarkdownEditorService } from './markdown.editor.service';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { filter, auditTime, takeUntil, combineLatest } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as docs from '../../../docs';
import { selectEditorState, selectContentState } from '../../state';
import { selectDocumentActionStatus } from '../../../docs/state/document.reducer';

@Injectable()
export class DocSaveCoordinateService implements OnDestroy {
  static autoSaveDelayAfterEdit = 5 * 60 * 1000; //5min

  isDirty$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isSaving: boolean;

  private editor: CodeMirror.Editor;
  private contentGeneration: number;
  private currentContent: string;
  private destroy$ = new Subject();

  constructor(private editorService: MarkdownEditorService, private store:Store<State>) {
    this.isDirty$
    .pipe(auditTime(DocSaveCoordinateService.autoSaveDelayAfterEdit))
    .subscribe(value => {
      if (this.currentContent && value) this.docService.save(this.currentContent);
    });

    const content$ = this.store.pipe(select(selectContentState))
    this.store.pipe(select(selectEditorState),combineLatest(content$),takeUntil(this.destroy$)).subscribe(([editor,content])=>{
      this.currentContent = content;
      this.editor = editor;
      this.checkDirty(editor);
    })

    this.editorService.docLoaded$.subscribe((editor: CodeMirror.Editor) => {
      this.docLoadedHandler(editor);
    });

    this.store.select(selectDocumentActionStatus).pipe(takeUntil(this.destroy$),filter)

    this.docService.docSaved$.subscribe((doc: Document) => {
      this.docSavedHandler(this.editor);
      this.isSaving = false;
    });

    this.docService.docSaving$.subscribe((doc: Document) => {
      this.isSaving = true;
    });
  }

  private docLoadedHandler(editor: CodeMirror.Editor) {
    if (this.docService.model.currentDoc) {
      this.docService.model.currentDoc.contentGeneration = editor.getDoc().changeGeneration();
    }
    this.checkDirty(editor);
  }

  private docSavedHandler(editor: CodeMirror.Editor) {
    if (editor) {
      this.docService.model.currentDoc.contentGeneration = editor.getDoc().changeGeneration();
      this.checkDirty(editor);
    }
  }

  private checkDirty(editor) {
    if (this.docService && this.docService.model && this.docService.model.currentDoc) {
      this.isDirty$.next(
        !editor.getDoc().isClean(this.docService.model.currentDoc.contentGeneration)
      );
    } else {
      this.isDirty$.next(true);
    }
  }

  private ngDestroy() {
    this.destroy$.next();
  }
}
