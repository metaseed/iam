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
import { DocumentMode } from '../state/reducers/document';
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
import { IMarkdownContainerService, MARKDOWN_CONTAINER_SERVICE_TOKEN } from '../model/markdown.model';
import { IContainer, ContainerRef, ICanComponentDeactivate } from 'core';
import { selectDocumentEditItState, EditMode, ViewMode, selectDocumentModeState } from '../state';
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

  docMode$ = this.store.pipe(select(selectDocumentModeState));

  markdown$ = this.store.select(selectCurrentDocumentContentString);

  constructor(
    private _elementRef: ElementRef,
    private state: StoreState<fromMarkdown.MarkdownState>,
    private dialog: MatDialog,
    @Inject(MARKDOWN_CONTAINER_SERVICE_TOKEN) public markdownService: IMarkdownContainerService,
    @Inject(HAMMER_GESTURE_CONFIG) private gestureConfig: HammerGestureConfig,
    private editorService: MarkdownEditorService,
    private store: Store<fromMarkdown.MarkdownState>,
    private ngZone: NgZone
  ) {
    super();

    this.editorService.docEditorLoaded$.subscribe(() => {
      setTimeout(() => (this.editorLoaded = true), 0);
    });

    this.store
      .select(selectDocumentEditItState)
      .subscribe(({ sourceLine } = {} as any) => {
        if (!sourceLine) return;
        this.store.dispatch(new EditMode());
        setTimeout(() => {
          this.editorService.goToLine(sourceLine[0]);
        }, 0);
      });

    super
      .addSub(
        this.editorService.docContentModified$.subscribe(this
          .markdownService.editorContentChanged$ as Subject<string>))
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
    (this.markdownService.editor$ as Subject<IContainer>).next(
      new ContainerRef(
        (this._elementRef.nativeElement as HTMLElement).getElementsByClassName(
          'CodeMirror-scroll'
        )[0] as HTMLElement,
        undefined,
        undefined,
        this.ngZone
      )
    );

    const hammer = this.gestureConfig.buildHammer((this._elementRef.nativeElement as HTMLElement).getElementsByClassName(
      'CodeMirror-scroll'
    )[0] as HTMLElement);

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
    this.store.dispatch(new ViewMode());
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
    if (status.isMemDirty) {
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
