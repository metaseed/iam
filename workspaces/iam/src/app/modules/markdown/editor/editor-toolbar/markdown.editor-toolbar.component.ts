import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  Renderer,
  ViewChild,
  Inject
} from '@angular/core';
import { MarkdownComponent } from '../../markdown.component';
import { DomSanitizer } from '@angular/platform-browser';

import { Subscription, Subject, Observable, merge } from 'rxjs';
import { DocService } from 'home';
import { MarkdownEditorService } from '../../editor/index';
import { CommandService, Command, DocumentRef, DocFormat, ScrollEvent } from '../../../core/index';
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
import { DocumentEffectsSave, DocumentEffectsCreate } from '../../../home/state';
import { IMarkdownService, MARKDOWN_SERVICE_TOKEN } from '../../model/markdown.model';

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
  isFullScreen: boolean;
  editor: any;
  @ViewChild('toolbar') toolbar: MatToolbar;

  docMode$ = this.store.pipe(select(fromMarkdown.selectDocumentModeState));
  documentMode$ = this.store.pipe(select(fromMarkdown.selectDocumentModeState));
  _scroll_viewer$ = this._markdownService.viewerScroll$.pipe(share());
  _scroll_editor$ = this._markdownService.editorScroll$.pipe(share());

  isPositionFixed$ = merge(this._scroll_viewer$, this._scroll_editor$).pipe(
    map(v => {
      if (this.toolbar)
        return (
          (v.event.target as HTMLElement).scrollTop >
          this.toolbar._elementRef.nativeElement.offsetHeight
        );
      return false;
    })
  );
  isScrollDown$ = merge(this._scroll_viewer$, this._scroll_editor$).pipe(map(v => v.isDown));
  isScrollDown_view$;
  destroy$ = new Subject();
  ngOnInit() {}

  isScreenWide$ = this.utils.isScreenWide$;

  constructor(
    private utils: Utilities,
    public markdown: MarkdownComponent,
    private _editorService: MarkdownEditorService,
    public docService: DocService,
    private _renderer: Renderer,
    private _commandService: CommandService,
    private store: Store<fromMarkdown.State>,
    private state: State<fromMarkdown.State>,
    public docSaver: DocSaveCoordinateService,
    @Inject(MARKDOWN_SERVICE_TOKEN) private _markdownService: IMarkdownService
  ) {
    this._editorService.editorLoaded$.pipe(takeUntil(this.destroy$)).subscribe(editor => {
      this.editor = editor;
    });
    (<any>CodeMirror).commands.save = this.save;
    let cmds = (<any>CodeMirror).commands;
    cmds.scrollLineUp = function(cm) {
      var info = cm.getScrollInfo();
      if (!cm.somethingSelected()) {
        var visibleBottomLine = cm.lineAtHeight(info.top + info.clientHeight, 'local');
        if (cm.getCursor().line >= visibleBottomLine) cm.execCommand('goLineUp');
      }
      cm.scrollTo(null, info.top - cm.defaultTextHeight());
    };
    cmds.scrollLineDown = function(cm) {
      var info = cm.getScrollInfo();
      if (!cm.somethingSelected()) {
        var visibleTopLine = cm.lineAtHeight(info.top, 'local') + 1;
        if (cm.getCursor().line <= visibleTopLine) cm.execCommand('goLineDown');
      }
      cm.scrollTo(null, info.top + cm.defaultTextHeight());
    };
  }

  ngDestroy() {
    this.destroy$.next();
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
    this.editorResize();
    const markdownState: fromMarkdown.MarkdownState = this.state.value.markdown;
    if (markdownState.document.showPreview) {
      this.store.dispatch(new doc.HidePreview());
    } else {
      this.store.dispatch(new doc.ShowPreview());
    }
  }

  ngAfterViewInit() {}

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

  fullScreen() {
    this.isFullScreen = !this.isFullScreen;
    this._renderer.setElementStyle(
      document.body,
      'overflowY',
      this.isFullScreen ? 'hidden' : 'auto'
    );
    this.editorResize();
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
  editorResize(timeOut: number = 100) {
    setTimeout(() => {
      this._editorService.refresh();
    }, timeOut);
  }
}
