import { Component, AfterViewInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { MarkdownComponent } from '../../markdown.component';

import { combineLatest } from 'rxjs';
import { DocService } from 'home';
import { ICodeMirrorEditor, MarkdownEditorService } from '..';
import { DocFormat, Logger } from 'core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { EditorSaveService  } from '../services/editor-save-service';
import { map, startWith, tap } from 'rxjs/operators';
import { SubscriptionManager, Utilities } from '../../../core/utils';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { DocumentMode, IMarkdownStore, MARKDOWN_STORE_TOKEN } from '../../model/markdown.model';
import { DocumentsEffects, DOCUMENT_EFFECTS_TOKEN } from 'app/modules/shared/store';
import { DocumentStore } from 'app/modules/shared/store/document.store';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ChangeNoteInputComponent } from './change-note-input.component';

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
  isStoreDirty$ = this.store.currentDocStatus_IsStoreDirty$
    .pipe(
      startWith(false)
    );
  isDbDirty$ = this.store.currentDocStatus_IsDbDirty$
    .pipe(
      startWith(false)
    );
  isSyncing$ = this.store.currentDocStatus_IsSyncing$
    .pipe(
      startWith(false)
    );

  dirtyInfo$ = combineLatest([this.isStoreDirty$, this.isDbDirty$, this.isSyncing$]).pipe(
    map(([memDirty, dbDirty, sync]) => {
      if (memDirty) { return 'modification not saved' }
      else if (dbDirty) { return 'modification not sync with server' }
      else if (sync) { return 'syncing modification with server' }
      else return '';
    })
  )

  showPreview$ = this.markdownStore.editWithPreview_;
  logger = Logger('MarkdownEditorToolbar');

  constructor(
    private router: Router,
    private utils: Utilities,
    public markdown: MarkdownComponent,
    private _editorService: MarkdownEditorService,
    public docService: DocService,
    private store: DocumentStore,
    private bottomSheet: MatBottomSheet,
    public docSaver: EditorSaveService,
    private _breakpointObserver: BreakpointObserver,
    @Inject(DOCUMENT_EFFECTS_TOKEN) private documentEffects: DocumentsEffects,
    @Inject(MARKDOWN_STORE_TOKEN) private markdownStore: IMarkdownStore,
  ) {
    super();
    super.addSub(
      this._breakpointObserver.observe(['(orientation: portrait)', '(orientation: landscape)']),
      this._editorService.docEditorLoaded$.subscribe(editor => {
        this.editor = editor;
      }),
      // switch to view mode if user view an history version with editor open
      this.store.currentDocStatus_IsEditable$.pipe(tap(
        isEditable => {
          if (!isEditable) this.toViewMode();
        }
      ))
    );

    const commands = this._editorService.commands;
    commands.save = this.onSave;
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

  onSave = () => {
    const content = this.editor.getValue();
    if (this.store.currentDocStatus_IsStoreDirty$.state) {
      // if is not dirty, remote side would not take the commit msg.
      // todo: update last commit msg.
      const changeNoteInput = this.bottomSheet.open(ChangeNoteInputComponent)
      changeNoteInput.afterDismissed().subscribe(o => {
        const msg = changeNoteInput.instance.changeNote;
        this.documentEffects.saveDocument_.next({ content, format: DocFormat.md, forceUpdate: true, changeLog: msg });
      })
    } else {
      this.logger.debug('it seems the document is not dirty.');
      this.documentEffects.saveDocument_.next({ content, format: DocFormat.md, forceUpdate: true, changeLog: '' });
    }
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
    if (this.markdownStore.editWithPreview_.state) {
      this.markdownStore.editWithPreview_.next(false);
    } else {
      this.markdownStore.editWithPreview_.next(true);
    }
  }

  hideHeight: number;

  ngAfterViewInit() {
    this.hideHeight = (this.toolbar.nativeElement as HTMLElement).offsetHeight;
  }

  toViewMode = () => {
    this.markdownStore.documentMode_.next(DocumentMode.View)
  };

  new = () => {
    this.documentEffects.createDocument_.next({ format: DocFormat.md });
  };

  previewPanelClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  lockScrollWithView = false;
  more(event: { item: HTMLElement }) {
    if (event.item.id === '0') {
      this.lockScrollWithView = !this.lockScrollWithView;
      this.markdownStore.isLockEditorScrollWithView_.next(this.lockScrollWithView);
      // this.store.dispatch(new edit.LockScrollWithView(this.lockScrollWithView));
    } else if (event.item.id === '1') {
      // const dialogRef = this.dialog.open(KeyMapSelectionDialog, {
      //   escapeToClose: true,
      //   clickOutsideToClose: true
      // });
      // dialogRef.componentInstance.myDialog._accept.subscribe(() => {});
    }
  }
}
