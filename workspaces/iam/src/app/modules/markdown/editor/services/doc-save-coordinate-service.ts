import { Injectable } from '@angular/core';
import { MarkdownEditorService } from './markdown.editor.service';
import { BehaviorSubject } from 'rxjs';
import { combineLatestWith, tap, debounceTime } from 'rxjs/operators';
import { Store, State } from '@ngrx/store';
import {
  ActionState,
  DocumentEffectsSave,
  actionStatusState$,
  DocumentEffectsActionType,
  selectCurrentDocStatus_IsMemDirty,
  UpdateCurrentDocumentStatus,
  selectCurrentDocStatus,
} from 'shared';
import { backOffAfter, DocFormat, SubscriptionManager } from 'core';

@Injectable()
export class DocSaveCoordinateService extends SubscriptionManager {
  static readonly AUTO_SAVE_DELAY_AFTER_LAST_EDIT_MS = 10 * 1000;
  private isDirty$ = this.store.select(selectCurrentDocStatus_IsMemDirty);
  isSyncing$ = new BehaviorSubject(false);
  isSaving: boolean;

  private editorLoaded$ = this.editorService.docEditorLoaded$;
  private contentGeneration: number;

  constructor(
    private editorService: MarkdownEditorService,
    private store: Store<any>,
    private state: State<any>
  ) {
    super();
    super
      .addSub(
        this.isDirty$
          .pipe(
            combineLatestWith(this.editorLoaded$),
            debounceTime(DocSaveCoordinateService.AUTO_SAVE_DELAY_AFTER_LAST_EDIT_MS), // e  e e          |
            tap(([isDirty, editor]) => {
              if (isDirty)
                this.store.dispatch(new DocumentEffectsSave({ content: editor.getValue(), format: DocFormat.md }));
            }),
            backOffAfter(5, 1000)
          ))
      .addSub(
        this.editorService.docContentSet$.subscribe((editor: CodeMirror.Editor) => {
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
    const oldStatus = selectCurrentDocStatus(this.state.value);
    if (!oldStatus || !this.contentGeneration) return; // initial content load
    const oldValue = oldStatus.isMemDirty;

    const isDirty = !editor.getDoc().isClean(this.contentGeneration);
    if (oldValue !== isDirty) {
      this.store.dispatch(new UpdateCurrentDocumentStatus({ ...oldStatus, isMemDirty: isDirty }));
    }
  }

}
