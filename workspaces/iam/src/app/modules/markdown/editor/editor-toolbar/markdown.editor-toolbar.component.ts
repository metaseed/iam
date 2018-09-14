import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  Renderer,
  ViewChild,
  Inject,
  ElementRef
} from '@angular/core';
import { MarkdownComponent } from '../../markdown.component';
import { DomSanitizer } from '@angular/platform-browser';

import { Subscription, Subject, Observable, merge } from 'rxjs';
import { DocService } from 'home';
import { MarkdownEditorService } from '..';
import { CommandService, Command, DocumentRef, DocFormat, ScrollEvent } from 'core';
import * as fromMarkdown from '../../state';
import { DocumentMode } from '../../state/reducers/document';
import { Store, select, State } from '@ngrx/store';
import * as doc from '../../state/actions/document';
import * as edit from '../../state/actions/edit';
import * as CodeMirror from 'codemirror';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DocSaveCoordinateService } from '../services/doc-save-coordinate-service';
import { MatToolbar, MatDialog } from '@angular/material';
import { takeUntil, map, share } from 'rxjs/operators';
import { Utilities } from '../../../core/utils';
import { IMarkdownService, MARKDOWN_SERVICE_TOKEN } from '../../model/markdown.model';
import { HtmlAstPath } from '@angular/compiler';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DocumentEffectsSave, DocumentEffectsCreate } from 'shared';

@Component({
  selector: 'editor-toolbar',
  templateUrl: './markdown.editor-toolbar.component.html',
  styleUrls: ['./markdown.editor-toolbar.component.scss'],
  animations: [
    trigger('show', [
      state('true', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void => true', [
        style({
          opacity: 0,
          transform: 'translateY(-100%)'
        }),
        animate('0.2s ease-in')
      ]),
      transition('true => void', [
        animate(
          '0.2s ease-out',
          style({
            opacity: 0,
            transform: 'translateY(-100%)'
          })
        )
      ])
    ])
  ]
})
export class EditorToolbarComponent implements OnInit, AfterViewInit {
  DocumentMode = DocumentMode;
  editor: any;
  @ViewChild('toolbar', { read: ElementRef })
  toolbar: ElementRef;

  private _destroy$ = new Subject();

  isScreenWide$ = this.utils.isScreenWide$;

  showPreview$ = this.store.select(fromMarkdown.selectDocumentShowPreviewState);

  constructor(
    private utils: Utilities,
    public markdown: MarkdownComponent,
    private _editorService: MarkdownEditorService,
    public docService: DocService,
    private store: Store<fromMarkdown.MarkdownState>,
    private state: State<fromMarkdown.MarkdownState>,
    public docSaver: DocSaveCoordinateService,
    private _breakpointObserver: BreakpointObserver,
    @Inject(MARKDOWN_SERVICE_TOKEN) private _markdownService: IMarkdownService
  ) {
    this._breakpointObserver
      .observe(['(orientation: portrait)', '(orientation: landscape)'])
      .pipe(takeUntil(this._destroy$))
      .subscribe(_ => {});
    this._editorService.docEditorLoaded$.pipe(takeUntil(this._destroy$)).subscribe(editor => {
      this.editor = editor;
    });
    (<any>CodeMirror).commands.save = this.save;
    const cmds = (<any>CodeMirror).commands;
    cmds.scrollLineUp = function(cm) {
      const info = cm.getScrollInfo();
      if (!cm.somethingSelected()) {
        const visibleBottomLine = cm.lineAtHeight(info.top + info.clientHeight, 'local');
        if (cm.getCursor().line >= visibleBottomLine) cm.execCommand('goLineUp');
      }
      cm.scrollTo(null, info.top - cm.defaultTextHeight());
    };
    cmds.scrollLineDown = function(cm) {
      const info = cm.getScrollInfo();
      if (!cm.somethingSelected()) {
        const visibleTopLine = cm.lineAtHeight(info.top, 'local') + 1;
        if (cm.getCursor().line <= visibleTopLine) cm.execCommand('goLineDown');
      }
      cm.scrollTo(null, info.top + cm.defaultTextHeight());
    };
  }

  ngOnInit() {}

  ngDestroy() {
    this._destroy$.next();
  }

  save = () => {
    const content = this.editor.getValue();
    this.store.dispatch(new edit.Save(content));
    this.store.dispatch(new DocumentEffectsSave({ content, format: DocFormat.md }));
  };

  undo = () => {
    if (!this.editor) return;
    this.editor.undo();
  };
  redo = () => {
    if (!this.editor) return;
    this.editor.redo();
  };

  togglePreview() {
    const markdownState: fromMarkdown.MarkdownState = this.state.value.markdown;
    if (markdownState.document.showPreview) {
      this.store.dispatch(new doc.HidePreview());
    } else {
      this.store.dispatch(new doc.ShowPreview());
    }
  }

  hideHeight: number;

  ngAfterViewInit() {
    this.hideHeight = (this.toolbar.nativeElement as HTMLElement).offsetHeight;
  }

  toViewMode = event => {
    this.store.dispatch(new doc.ViewMode());
  };

  new = () => {
    this.store.dispatch(new DocumentEffectsCreate({ format: DocFormat.md }));
  };

  previewPanelClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  lockScrollWithView = false;
  more(event: { item: HTMLElement }) {
    if (event.item.id === '0') {
      this.lockScrollWithView = !this.lockScrollWithView;
      this.store.dispatch(new edit.LockScrollWithView(this.lockScrollWithView));
    } else if (event.item.id === '1') {
      // const dialogRef = this.dialog.open(KeyMapSelectionDialog, {
      //   escapeToClose: true,
      //   clickOutsideToClose: true
      // });
      // dialogRef.componentInstance.myDialog._accept.subscribe(() => {});
    }
  }
}
