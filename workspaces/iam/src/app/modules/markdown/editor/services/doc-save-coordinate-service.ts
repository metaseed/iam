import { Injectable, OnDestroy } from '@angular/core';
import { MarkdownEditorService } from './markdown.editor.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { auditTime, takeUntil, combineLatest } from 'rxjs/operators';
import { Store, State } from '@ngrx/store';
import {
  ActionState,
  DocumentEffectsSave,
  actionStatusState$,
  DocumentEffectsActionType,
  selectCurrentDocStatus_IsMemDirty,
  UpdateCurrentDocumentStatus,
  selectCurrentDocStatus
} from 'shared';

@Injectable()
export class DocSaveCoordinateService implements OnDestroy {
  static autoSaveDelayAfterEdit = 10 * 1000; // 20s

  private isDirty$ = this.store.select(selectCurrentDocStatus_IsMemDirty);
  isSyncing$ = new BehaviorSubject(false);
  isSaving: boolean;

  private editorLoaded$ = this.editorService.docEditorLoaded$;
  private contentGeneration: number;
  private destroy$ = new Subject();

  constructor(
    private editorService: MarkdownEditorService,
    private store: Store<any>,
    private state: State<any>
  ) {
    this.isDirty$
      .pipe(
        takeUntil(this.destroy$),
        auditTime(DocSaveCoordinateService.autoSaveDelayAfterEdit),
        combineLatest(this.editorLoaded$)
      )
      .subscribe(([isDirty, editor]) => {
        if (isDirty) this.store.dispatch(new DocumentEffectsSave({ content: editor.getValue() }));
      });

    this.editorService.docContentSet$.subscribe((editor: CodeMirror.Editor) => {
      this.docLoadedHandler(editor);
    });

    this.editorService.docContentModified$
      .pipe(
        takeUntil(this.destroy$),
        combineLatest(this.editorLoaded$)
      )
      .subscribe(([content, editor]) => this.checkDirty(editor));

    actionStatusState$(this.store, DocumentEffectsActionType.Save)
      .pipe(
        takeUntil(this.destroy$),
        combineLatest(this.editorLoaded$)
      )
      .subscribe(([as, editor]) => {
        if (as.state === ActionState.Start) {
          this.docSavedHandler(editor);
          this.isSaving = true;
        } else if (as.state === ActionState.Succession || as.state === ActionState.Fail) {
          this.isSaving = false;
        }
      });
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

  ngOnDestroy() {
    this.destroy$.next();
  }
}
