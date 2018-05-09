import { Injectable } from '@angular/core';
import { Document } from '../../../docs/models/document';
import { MarkdownEditorService } from './markdown.editor.service';
import { DocService } from 'docs';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { filter, auditTime } from 'rxjs/operators';

@Injectable()
export class DocSaveCoordinateService {
  isDirty$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  editor: CodeMirror.Editor;
  isSaving: boolean;
  private currentContent: string;
  static autoSaveDelayAfterEdit = 5 * 60 * 1000; //5min

  constructor(private editorService: MarkdownEditorService, private docService: DocService) {
    this.isDirty$
      .pipe(auditTime(DocSaveCoordinateService.autoSaveDelayAfterEdit))
      .subscribe(value => {
        if (this.currentContent && value) this.docService.save(this.currentContent);
      });

    this.editorService.editorLoaded$.subscribe((editor: CodeMirror.Editor) => {
      this.editor = editor;

      this.editorService.contentChanged$.subscribe((e: [string, CodeMirror.Editor]) => {
        this.currentContent = e[0];
        this.checkDirty(editor);
      });
    });

    this.editorService.docLoaded$.subscribe((editor: CodeMirror.Editor) => {
      this.docLoadedHandler(editor);
    });

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
}
