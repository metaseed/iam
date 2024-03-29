import { Inject, Injectable } from '@angular/core';
import { MarkdownEditorService } from './markdown-editor.service';
import { BehaviorSubject } from 'rxjs';
import { tap, debounceTime, mergeWith, map } from 'rxjs/operators';
import { AUTO_SAVE_TO_STORE_AFTER_LAST_EDIT_INTERVAL, backoff, DocFormat, SubscriptionManager } from 'core';
import { ICodeMirrorEditor } from '../model';
import { DocumentsEffects, DOCUMENT_EFFECTS_TOKEN } from 'app/modules/shared/store';
import { OperationStep } from 'packages/rx-store/src/effect';
import { DocumentStore } from 'app/modules/shared/store/document.store';
import CodeMirror from 'codemirror';

@Injectable()
export class EditorSaveService extends SubscriptionManager {
  isSyncing$ = new BehaviorSubject(false);
  isSaving: boolean;
  private editor: CodeMirror.Editor;
  private contentGeneration: number;

  constructor(
    private editorService: MarkdownEditorService,
    private store: DocumentStore,
    @Inject(DOCUMENT_EFFECTS_TOKEN) private documentEffects: DocumentsEffects,

  ) {
    super();
    super.addSub(
      this.editorService.docEditorLoaded$.subscribe(editor => this.editor = editor),

      this.store.currentDocStatus_IsEditorDirty$.pipe(
        mergeWith(this.editorService.docContentModified$.pipe(map(_ => true))),
        debounceTime(AUTO_SAVE_TO_STORE_AFTER_LAST_EDIT_INTERVAL), // e  e e          |
        tap((isDirty) => {
          if (isDirty)
            this.documentEffects.saveDocument_.next({ id: this.store.currentId_.state, content: this.editor.getValue(), format: DocFormat.md });
        }),
        backoff(8, 5000)
      ),

      this.editorService.docContentSet$.subscribe((editor: ICodeMirrorEditor) => {
        this.docLoadedHandler(editor);
      }),

      this.editorService.docContentModified$.subscribe(([content, editor]) => this.checkDirty(editor)),

      this.documentEffects.saveDocument_.operationStatus$.subscribe((as) => {
        if (as.step === OperationStep.Start) {
          this.docSavedHandler(this.editor);
          this.isSaving = true;
        } else if (as.isEndStatus()) {
          this.isSaving = false;
        }
      })
    )
  }

  private docLoadedHandler(editor: CodeMirror.Editor) {
    const doc = editor.getDoc();
    this.contentGeneration = doc.changeGeneration();
    doc.clearHistory();
    this.checkDirty(editor);
  }

  private docSavedHandler(editor: CodeMirror.Editor) {
    if (editor) {
      this.contentGeneration = editor.getDoc().changeGeneration(false);
      this.checkDirty(editor);
    }
  }

  private checkDirty(editor: CodeMirror.Editor) {
    if (!this.contentGeneration) return; // initial content load

    const isEditorDirty = !editor.getDoc().isClean(this.contentGeneration);
    this.store.upsertDocStatus({ isEditorDirty });
  }

}
