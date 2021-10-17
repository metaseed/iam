import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MarkdownComponent } from '../../markdown.component';

import { combineLatest } from 'rxjs';
import { DocService } from 'home';
import { ICodeMirrorEditor, MarkdownEditorService } from '..';
import { DocFormat } from 'core';
import * as fromMarkdown from '../../state';
import { DocumentMode } from '../../state/reducers/document';
import { Store, State } from '@ngrx/store';
import * as doc from '../../state/actions/document';
import * as edit from '../../state/actions/edit';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DocSaveCoordinateService } from '../services/doc-save-coordinate-service';
import { map, startWith, tap } from 'rxjs/operators';
import { SubscriptionManager, Utilities } from '../../../core/utils';
import { BreakpointObserver } from '@angular/cdk/layout';
import {
  DocumentEffectsSave,
  DocumentEffectsCreate,
  selectCurrentDocStatus_IsEditorDirty,
  selectCurrentDocStatus_IsDbDirty,
  selectCurrentDocStatus_IsSyncing
} from 'shared';
import { Router } from '@angular/router';

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
export class EditorToolbarComponent extends SubscriptionManager implements AfterViewInit {
  DocumentMode = DocumentMode;
  editor: ICodeMirrorEditor;
  @ViewChild('toolbar', { read: ElementRef })
  toolbar: ElementRef;
  isScreenWide$ = this.utils.isWideScreen$;
  isEditorDirty$ = this.store
    .select(selectCurrentDocStatus_IsEditorDirty)
    .pipe(
      startWith(false)
    );
  isDbDirty$ = this.store
    .select(selectCurrentDocStatus_IsDbDirty)
    .pipe(
      startWith(false)
    );
  isSyncing$ = this.store
    .select(selectCurrentDocStatus_IsSyncing)
    .pipe(
      startWith(false)
    );

  dirtyInfo$ = combineLatest([this.isEditorDirty$, this.isDbDirty$, this.isSyncing$]).pipe(
    map(([memDirty, dbDirty, sync]) => {
      if (memDirty) { return 'modification not saved' }
      else if (dbDirty) { return 'modification not sync with server' }
      else if (sync) { return 'syncing modification with server' }
      else return '';
    })
  )

  showPreview$ = this.store.select(fromMarkdown.selectDocumentShowPreviewState);

  constructor(
    private router: Router,
    private utils: Utilities,
    public markdown: MarkdownComponent,
    private _editorService: MarkdownEditorService,
    public docService: DocService,
    private store: Store<fromMarkdown.MarkdownState>,
    private state: State<fromMarkdown.MarkdownState>,
    public docSaver: DocSaveCoordinateService,
    private _breakpointObserver: BreakpointObserver
  ) {
    super();
    super.addSub(
      this._breakpointObserver.observe(['(orientation: portrait)', '(orientation: landscape)'])
    ).addSub(
      this._editorService.docEditorLoaded$.subscribe(editor => {
        this.editor = editor;
      })
    );

    const commands = this._editorService.commands;
    commands.save = this.save;
    commands.scrollLineUp = function (cm) {
      const info = cm.getScrollInfo();
      if (!cm.somethingSelected()) {
        const visibleBottomLine = cm.lineAtHeight(info.top + info.clientHeight, 'local');
        if (cm.getCursor().line >= visibleBottomLine) cm.execCommand('goLineUp');
      }
      cm.scrollTo(null, info.top - cm.defaultTextHeight());
    };

    commands.scrollLineDown = function (cm) {
      const info = cm.getScrollInfo();
      if (!cm.somethingSelected()) {
        const visibleTopLine = cm.lineAtHeight(info.top, 'local') + 1;
        if (cm.getCursor().line <= visibleTopLine) cm.execCommand('goLineDown');
      }
      cm.scrollTo(null, info.top + cm.defaultTextHeight());
    };
  }


  back(e) {
    // this.location.back();
    this.router.navigateByUrl('/home');
  }

  save = () => {
    const content = this.editor.getValue();
    // this.store.dispatch(new edit.Save(content));
    this.store.dispatch(
      new DocumentEffectsSave({ content, format: DocFormat.md, forceUpdate: true })
    );
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
