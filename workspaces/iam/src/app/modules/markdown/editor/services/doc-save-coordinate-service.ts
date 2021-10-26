import { Inject, Injectable } from '@angular/core';
import { MarkdownEditorService } from './markdown-editor.service';
import { BehaviorSubject } from 'rxjs';
import { combineLatestWith, tap, debounceTime } from 'rxjs/operators';
import { Store, State } from '@ngrx/store';
import {
  ActionState,
  actionStatusState$,
  DocumentEffectsActionType,
  selectCurrentDocStatus_IsEditorDirty,
  UpdateCurrentDocumentStatus,
  selectCurrentDocStatus,
} from 'shared';
import { AUTO_SAVE_TO_DB_AFTER_LAST_EDIT_INTERVAL, backoff, DocFormat, SubscriptionManager } from 'core';
import { ICodeMirrorEditor } from '../model';
import { DocumentsEffects, DOCUMENT_EFFECTS_TOKEN } from 'app/modules/shared/store';

@Injectable()
export class DocSaveCoordinateService extends SubscriptionManager {
  isSyncing$ = new BehaviorSubject(false);
  isSaving: boolean;

  private editorLoaded$ = this.editorService.docEditorLoaded$;
  private contentGeneration: number;

  constructor(
    private editorService: MarkdownEditorService,
    private store: Store<any>,
    private state: State<any>,
    @Inject(DOCUMENT_EFFECTS_TOKEN) private documentEffects: DocumentsEffects,

  ) {
    super();
    super
      .addSub(
        this.store.select(selectCurrentDocStatus_IsEditorDirty)
          .pipe(
            combineLatestWith(this.editorLoaded$),
            debounceTime(AUTO_SAVE_TO_DB_AFTER_LAST_EDIT_INTERVAL), // e  e e          |
            tap(([isDirty, editor]) => {
              if (isDirty)
              this.documentEffects.saveDocument_.next({ content: editor.getValue(), format: DocFormat.md });
            }),
            backoff(8, AUTO_SAVE_TO_DB_AFTER_LAST_EDIT_INTERVAL)
          ))
      .addSub(
        this.editorService.docContentSet$.subscribe((editor: ICodeMirrorEditor) => {
          this.docLoadedHandler(editor);
        }))
      .addSub(
        this.editorService.docContentModified$
          .pipe(
            combineLatestWith(this.editorLoaded$)
          )
          .subscribe(([content, editor]) => this.checkDirty(editor)))
      .addSub(
        actionStatusState$(this.store, DocumentEffectsActionType.Save)
          .pipe(
            combineLatestWith(this.editorLoaded$)
          )
          .subscribe(([as, editor]) => {
            if (as.state === ActionState.Start) {
              this.docSavedHandler(editor);
              this.isSaving = true;
            } else if (as.state === ActionState.Succession || as.state === ActionState.Fail) {
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
    const statusInStore = selectCurrentDocStatus(this.state.value);
    if (!statusInStore ) return;

    if(!this.contentGeneration) return; // initial content load

    const isEditorDirty = !editor.getDoc().isClean(this.contentGeneration);
    if (statusInStore.isEditorDirty !== isEditorDirty) {
      this.store.dispatch(new UpdateCurrentDocumentStatus({ ...statusInStore, isEditorDirty }));
    }
  }

}
