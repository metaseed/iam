import {
  Component,
  ViewChild,
  Inject,
  ElementRef,
  NgZone,
  ChangeDetectionStrategy,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { MarkdownEditorService } from '.';
import { CodemirrorComponent } from './codemirror-editor/codemirror-component/codemirror.component';
import * as fromMarkdown from '../state';
import { DocumentMode } from '../state/reducers/document';
import { DocSaveCoordinateService } from './services/doc-save-coordinate-service';
import { Observable, Subject, Subscription, fromEvent } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
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
import { selectDocumentEditItState, EditMode, ViewMode } from '../state';
import { KeyMapService } from './services';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

@Component({
  selector: 'ms-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.scss']
})
export class MarkdownEditorComponent implements ICanComponentDeactivate, AfterViewInit, OnDestroy {
  editorLoaded = false;
  destroy$ = new Subject();
  DocumentMode = DocumentMode;

  @ViewChild(CodemirrorComponent)
  codeMirrorComponent: CodemirrorComponent;

  docMode$ = this.store.pipe(select(fromMarkdown.selectDocumentModeState));

  markdown$ = this.store.select(selectCurrentDocumentContentString);

  // could not use takeuntil, otherwise the view is not updated when edit,
  // when reconstruct this component
  contentChangeSubscription: Subscription;

  constructor(
    private _elementRef: ElementRef,
    private state: StoreState<fromMarkdown.MarkdownState>,
    private dialog: MatDialog,
    @Inject(MARKDOWN_CONTAINER_SERVICE_TOKEN) public markdownService: IMarkdownContainerService,
    @Inject(HAMMER_GESTURE_CONFIG) private gestureConfig: HammerGestureConfig,
    private editorService: MarkdownEditorService,
    private docSaveCoordinatorService: DocSaveCoordinateService,
    private store: Store<fromMarkdown.MarkdownState>,
    private ngZone: NgZone
  ) {
    this.editorService.docEditorLoaded$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      setTimeout(() => (this.editorLoaded = true), 0);
    });

    this.store
      .select(selectDocumentEditItState)
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ sourceLine } = {} as any) => {
        if (!sourceLine) return;
        this.store.dispatch(new EditMode());
        setTimeout(() => {
          this.editorService.goToLine(sourceLine[0]);
        }, 0);
      });

    this.contentChangeSubscription = this.editorService.docContentModified$.subscribe(this
      .markdownService.editorContentChanged$ as Subject<string>);

    this.docMode$.pipe(takeUntil(this.destroy$)).subscribe(mode => {
      switch (mode) {
        case DocumentMode.Edit: {
          setTimeout(() => this.codeMirrorComponent.refresh(), 0);

          break;
        }
      }
    });
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

    fromEvent(hammer, 'swiperight').pipe(takeUntil(this.destroy$))
      .subscribe((res: any) => {
        this.toViewMode(res);
      })
    fromEvent(hammer, 'swipeleft').pipe(takeUntil(this.destroy$))
      .subscribe((res: any) => {
        this.toViewMode(res);
      })
  }

  private toViewMode = event => {
    this.store.dispatch(new ViewMode());
  };

  ngOnDestroy() {
    this.contentChangeSubscription.unsubscribe();
    this.destroy$.next(null);
  }

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
