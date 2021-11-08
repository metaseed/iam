import {
  Component,
  ViewChild,
  Inject,
  ElementRef,
  NgZone,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { MarkdownEditorService } from '.';
import { CodemirrorComponent } from './codemirror-editor/codemirror-component/codemirror.component';
import { Observable, fromEvent, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DocDirtyNotifyDialog } from './doc-dirty-notify-dialog';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { NEW_DOC_ID } from 'shared';
import { DocumentMode, IMarkdownStore, MARKDOWN_STORE_TOKEN } from '../model/markdown.model';
import { ContainerRef, ICanComponentDeactivate, Utilities } from 'core';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { SubscriptionManager } from 'app/modules/core/utils/subscription-manager';
import { DocumentsEffects, DOCUMENT_EFFECTS_TOKEN } from 'app/modules/shared/store';
import { DocumentStore } from 'app/modules/shared/store/document.store';

@Component({
  selector: 'ms-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.scss']
})
export class MarkdownEditorComponent extends SubscriptionManager implements ICanComponentDeactivate, AfterViewInit, OnDestroy {
  editorLoaded = false;
  DocumentMode = DocumentMode;

  @ViewChild(CodemirrorComponent)
  codeMirrorComponent: CodemirrorComponent;

  docMode$ = this.markdownStore.documentMode_;

  markdown$ = this.store.currentDocContentString$;

  constructor(
    @Inject(DOCUMENT_EFFECTS_TOKEN) private documentEffects: DocumentsEffects,
    private _elementRef: ElementRef,
    private dialog: MatDialog,
    @Inject(MARKDOWN_STORE_TOKEN) public markdownStore: IMarkdownStore,
    @Inject(HAMMER_GESTURE_CONFIG) private gestureConfig: HammerGestureConfig,
    private editorService: MarkdownEditorService,
    private store: DocumentStore,
    private ngZone: NgZone,
    private utils: Utilities
  ) {
    super();

    super
      .addSub(
        this.editorService.docEditorLoaded$.subscribe(() => {
          setTimeout(() => (this.editorLoaded = true), 0);
        }))
      .addSub(
        this.markdownStore.editIt_
          .subscribe(({ sourceLine } = {} as any) => {
            if (!sourceLine) return;
            this.markdownStore.documentMode_.next(DocumentMode.Edit);
            setTimeout(() => {
              this.editorService.gotoLine(sourceLine[0]);
            }, 0);
          }))
      .addSub(
        this.editorService.docContentModified$.subscribe(this
          .markdownStore.editorContentChanged_))
      .addSub(
        this.docMode$.subscribe(mode => {
          switch (mode) {
            case DocumentMode.Edit: {
              setTimeout(() => this.codeMirrorComponent.refresh(), 0);
              break;
            }
          }
        })
      );
  }

  ngAfterViewInit() {
    const codeMirrorScrollElement = (this._elementRef.nativeElement as HTMLElement).getElementsByClassName('CodeMirror-scroll')[0] as HTMLElement;

    this.markdownStore.editor_.next(
      new ContainerRef(
        codeMirrorScrollElement,
        undefined,
        undefined,
        this.ngZone
      )
    );

    let hammer = null;
    super.addSub(this.utils.isWideScreen$.pipe(
      tap(wide => {
        if (!wide) { // small
          if (hammer === null) {
            hammer = this.gestureConfig.buildHammer(codeMirrorScrollElement);
            hammer.on('swiperight', this.toViewMode);
            hammer.on('swipeleft', this.toViewMode);
          }
        } else {
          if (hammer) {
            hammer.off('swiperight')
            hammer.off('swipeleft')
            hammer.destroy();
            hammer = null;
          }
        }
      })).subscribe())
  }

  private toViewMode = event => {
    this.markdownStore.documentMode_.next(DocumentMode.View);
  };


  // implements ICanComponentDeactivate
  canDeactivate(): Observable<boolean> {
    const deleteNewDoc = () => {
      const id = this.store.currentId_.state;
      if (id === NEW_DOC_ID) {
        this.documentEffects.deleteDocument_.next({ id });
      }
    };

    const status = this.store.currentDocStatus$.state;
    if (status.isEditorDirty) {
      return this.dialog
        .open(DocDirtyNotifyDialog)
        .afterClosed()
        .pipe(
          map(value => {
            if (value === 'Yes') {
              this.documentEffects.saveDocument_.next({
                content: this.codeMirrorComponent.value,
                forceUpdate: true
              });
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
