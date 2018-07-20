import {
  Component,
  OnInit,
  Input,
  Output,
  ViewChild,
  Inject,
  HostBinding,
  ElementRef
} from '@angular/core';
import { MarkdownEditorService } from './index';
import { EventEmitter } from '@angular/core';
import { CodemirrorComponent } from './codemirror-editor/codemirror.component';
import * as fromMarkdown from './../state';
import { DocumentMode } from './../state/reducers/document';
import { DocSaveCoordinateService } from './services/doc-save-coordinate-service';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/Operators';
import { Store, select, State as StoreState } from '@ngrx/store';
import { DocDirtyNotifyDialog } from './doc-dirty-notify-dialog';
import { MatDialog } from '@angular/material';
import { of } from 'rxjs';
import {
  DocumentEffectsSave,
  selectCurrentDocumentIdState,
  DocumentEffectsDelete
} from '../../home/state';
import { NEW_DOC_ID } from '../../home/const';
import { IMarkdownService, MARKDOWN_SERVICE_TOKEN } from '../model/markdown.model';
import { IContainer, ContainerRef } from 'core';

@Component({
  selector: 'ms-markdown-editor',
  template: `
    <editor-toolbar  #toolbar [scrollHide]="[{container$:markdownService.viewer$},{container$:markdownService.editor$,padding:scroll}]"
  [hide]="(docMode$|async)!==DocumentMode.Edit" [hideHeight]="toolbar.hideHeight"></editor-toolbar>
  <div #scroll style="overflow-y:auto;height:100%">

  <codemirror [(ngModel)]="markdown"></codemirror>
  </div>
    <sk-cube-grid [isRunning]="!editorLoaded"></sk-cube-grid>
    `,
  styles: []
})
export class MarkdownEditorComponent {
  editorLoaded = false;
  destroy$ = new Subject();
  DocumentMode = DocumentMode;

  @HostBinding('style.display') _d = 'block';
  // @HostBinding('style.flex-direction') _dr = 'column';

  @HostBinding('style.height') _h = '100vh';

  @Output() markdownChange = new EventEmitter<string>();
  @ViewChild('scroll') scroll: ElementRef;
  @ViewChild(CodemirrorComponent) codeMirrorComponent: CodemirrorComponent;

  docMode$ = this.store.pipe(select(fromMarkdown.selectDocumentModeState));

  _markdown: string;
  @Input()
  get markdown(): string {
    return this._markdown;
  }
  set markdown(value) {
    this._markdown = value;
    this.markdownChange.emit(value);
  }
  me: HTMLElement;

  constructor(
    private _elementRef: ElementRef,
    private state: StoreState<fromMarkdown.State>,
    private dialog: MatDialog,
    @Inject(MARKDOWN_SERVICE_TOKEN) private markdownService: IMarkdownService,
    private editorService: MarkdownEditorService,
    private docSaveCoordinater: DocSaveCoordinateService,
    private store: Store<fromMarkdown.State>
  ) {
    this.me = _elementRef.nativeElement;
    this.editorService.editorLoaded$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      setTimeout(() => (this.editorLoaded = true), 0);
    });

    this.docMode$.pipe(takeUntil(this.destroy$)).subscribe(mode => {
      switch (mode) {
        case DocumentMode.Edit: {
          setTimeout(() => this.codeMirrorComponent.refresh(), 0);

          break;
        }
      }
    });
  }

  ngOnInit() {
    (this.markdownService.editor$ as Subject<IContainer>).next(
      new ContainerRef(this.scroll.nativeElement)
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  canDeactivate(): Observable<boolean> {
    const deleteNewDoc = () => {
      const id = selectCurrentDocumentIdState(this.state.value);
      if (id === NEW_DOC_ID) {
        this.store.dispatch(new DocumentEffectsDelete({ id }));
      }
    };
    if (this.docSaveCoordinater.isDirty$.value) {
      return this.dialog
        .open(DocDirtyNotifyDialog)
        .afterClosed()
        .pipe(
          map(value => {
            if (value === 'Yes') {
              this.store.dispatch(
                new DocumentEffectsSave({ content: this.codeMirrorComponent.value })
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
