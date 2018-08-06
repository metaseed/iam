import { Injectable, OnDestroy } from '@angular/core';
import { MarkdownEditorService } from './markdown.editor.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { auditTime, takeUntil, combineLatest } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
  ActionState,
  DocumentEffectsSave,
  actionStatusState$,
  DocumentEffectsActionTypes
} from 'shared';

@Injectable()
export class DocSaveCoordinateService implements OnDestroy {
  static autoSaveDelayAfterEdit = 5 * 60 * 1000; // 5min

  isDirty$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isSaving: boolean;

  private editor$ = this.editorService.editorLoaded$;
  private contentGeneration: number;
  private destroy$ = new Subject();

  constructor(private editorService: MarkdownEditorService, private store: Store<any>) {
    this.isDirty$
      .pipe(
        takeUntil(this.destroy$),
        auditTime(DocSaveCoordinateService.autoSaveDelayAfterEdit),
        combineLatest(this.editor$)
      )
      .subscribe(([isDirty, editor]) => {
        if (isDirty) this.store.dispatch(new DocumentEffectsSave({ content: editor.getValue() }));
      });

    this.editorService.docLoaded$.subscribe((editor: CodeMirror.Editor) => {
      this.docLoadedHandler(editor);
    });

    this.editorService.contentChanged$
      .pipe(
        takeUntil(this.destroy$),
        combineLatest(this.editor$)
      )
      .subscribe(([, editor]) => this.checkDirty(editor));

    actionStatusState$(this.store, DocumentEffectsActionTypes.Save)
      .pipe(
        takeUntil(this.destroy$),
        combineLatest(this.editor$)
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
    this.contentGeneration = editor.getDoc().changeGeneration();
    this.checkDirty(editor);
  }

  private docSavedHandler(editor: CodeMirror.Editor) {
    if (editor) {
      this.contentGeneration = editor.getDoc().changeGeneration();
      this.checkDirty(editor);
    }
  }

  private checkDirty(editor) {
    const oldValue = this.isDirty$.value;
    const isDirty = !editor.getDoc().isClean(this.contentGeneration);
    if (oldValue != isDirty) {
      this.isDirty$.next(isDirty);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
