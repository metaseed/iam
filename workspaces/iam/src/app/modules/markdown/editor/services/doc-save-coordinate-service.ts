import { Injectable, OnDestroy } from '@angular/core';
import { MarkdownEditorService } from './markdown.editor.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { auditTime, takeUntil, combineLatest } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
  DocumentEffectsSave,
  getActionStatus,
  DocumentEffectsActionTypes,
  ActionStatus
} from '../../../home/state';

@Injectable()
export class DocSaveCoordinateService implements OnDestroy {
  static autoSaveDelayAfterEdit = 5 * 60 * 1000; //5min

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

    this.editorService.contentChanged$.pipe(takeUntil(this.destroy$),combineLatest(this.editor$)).subscribe(
      ([,editor])=>this.checkDirty(editor)
    )

    getActionStatus(DocumentEffectsActionTypes.Save, this.store)
      .pipe(
        takeUntil(this.destroy$),
        combineLatest(this.editor$)
      )
      .subscribe(([as, editor]) => {
        if (as.status === ActionStatus.Start) {
          this.docSavedHandler(editor);
          this.isSaving = true;
        } else if (as.status === ActionStatus.Success || as.status === ActionStatus.Fail) {
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
    this.isDirty$.next(!editor.getDoc().isClean(this.contentGeneration));
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
