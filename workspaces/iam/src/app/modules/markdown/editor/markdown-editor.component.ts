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
import * as fromMarkdown from '../state';
import { Observable, Subject, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store, select, State as StoreState } from '@ngrx/store';
import { DocDirtyNotifyDialog } from './doc-dirty-notify-dialog';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import {
  DocumentEffectsSave,
  selectCurrentDocumentId,
  DocumentEffectsDelete,
  NEW_DOC_ID,
  selectCurrentDocStatus,
  selectCurrentDocumentContentString
} from 'shared';
import { DocumentMode, IMarkdownContainerStore, MARKDOWN_CONTAINER_SERVICE_TOKEN } from '../model/markdown.model';
import { ContainerRef, ICanComponentDeactivate } from 'core';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { SubscriptionManager } from 'app/modules/core/utils/subscription-manager';

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

  docMode$ = this.markdownContainerStore.documentMode_;

  markdown$ = this.store.select(selectCurrentDocumentContentString);

  constructor(
    private _elementRef: ElementRef,
    private state: StoreState<any>,
    private dialog: MatDialog,
    @Inject(MARKDOWN_CONTAINER_SERVICE_TOKEN) public markdownContainerStore: IMarkdownContainerStore,
    @Inject(HAMMER_GESTURE_CONFIG) private gestureConfig: HammerGestureConfig,
    private editorService: MarkdownEditorService,
    private store: Store<any>,
    private ngZone: NgZone
  ) {
    super();

    super
      .addSub(
        this.editorService.docEditorLoaded$.subscribe(() => {
          setTimeout(() => (this.editorLoaded = true), 0);
        }))
      .addSub(
          this.markdownContainerStore.editIt_
          .subscribe(({ sourceLine } = {} as any) => {
            if (!sourceLine) return;
            this.markdownContainerStore.documentMode_.next(DocumentMode.Edit);
            setTimeout(() => {
              this.editorService.goToLine(sourceLine[0]);
            }, 0);
          }))
      .addSub(
        this.editorService.docContentModified$.subscribe(this
          .markdownContainerStore.editorContentChanged_))
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

    this.markdownContainerStore.editor_.next(
      new ContainerRef(
        codeMirrorScrollElement,
        undefined,
        undefined,
        this.ngZone
      )
    );

    const hammer = this.gestureConfig.buildHammer(codeMirrorScrollElement);

    super.addSub(
      fromEvent(hammer, 'swiperight')
        .subscribe((res: any) => {
          this.toViewMode(res);
        })
    ).addSub(
      fromEvent(hammer, 'swipeleft')
        .subscribe((res: any) => {
          this.toViewMode(res);
        })
    )
  }

  private toViewMode = event => {
    this.markdownContainerStore.documentMode_.next(DocumentMode.View);
  };


  // implements ICanComponentDeactivate
  canDeactivate(): Observable<boolean> {
    const deleteNewDoc = () => {
      const id = selectCurrentDocumentId(this.state.value);
      if (id === NEW_DOC_ID) {
        this.store.dispatch(new DocumentEffectsDelete({ id }));
      }
    };

    const status = selectCurrentDocStatus(this.state.value);
    if (status.isEditorDirty) {
      return this.dialog
        .open(DocDirtyNotifyDialog)
        .afterClosed()
        .pipe(
          map(value => {
            if (value === 'Yes') {
              this.store.dispatch(
                new DocumentEffectsSave({
                  content: this.codeMirrorComponent.value,
                  forceUpdate: true
                })
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
