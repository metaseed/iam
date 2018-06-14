import * as doc from './state/actions/document';
import { Component, OnInit, ViewChild, Inject, HostListener, ElementRef } from '@angular/core';
import { MarkdownViewerComponent } from './viewer/markdown-viewer.component';
import { HttpClient } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { take, map, timeout, tap, takeUntil, combineLatest, share } from 'rxjs/operators';
import { DocService } from 'home';
import { MarkdownEditorService } from './editor/index';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { base64Decode, DocumentRef, Scrollable } from 'core';
import { Store, select, State } from '@ngrx/store';
import * as fromMarkdown from './state';
import * as fromView from './state/actions/view';
import { DocumentMode } from './state/reducers/document';
import * as document from './state/actions/document';
import { ChangeDetectorRef } from '@angular/core';
import { MarkdownEditorComponent } from './editor/markdown-editor.component';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { OnDestroy } from '@angular/core';
import { MarkdownViewerContainerComponent } from './viewer/markdown-viewer-container.component';
import { HasElementRef } from '@angular/material/core/typings/common-behaviors/color';
import { Observable, Subscription, Subject, merge } from 'rxjs';
import { DocSaveCoordinateService } from './editor/services/doc-save-coordinate-service';
import {
  DocumentEffectsShow,
  selectCurrentDocumentState,
  DocumentEffectsNew,
  getDocumentByIdSeletor,
  SetCurrentDocumentId
} from '../home/state';
import { Document } from '../home/models/document';
import { Utilities } from '../core/utils';

@Component({
  selector: 'ms-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss']
})
export class MarkdownComponent implements OnInit, OnDestroy {
  isFullScreen: boolean;
  fixEditButton = false;
  showPreviewPanel = true;
  @ViewChild(MarkdownEditorComponent) editor: MarkdownEditorComponent;
  @ViewChild(MarkdownViewerContainerComponent) viewer: MarkdownViewerContainerComponent;
  @ViewChild('viewerDiv') viewerDiv: ElementRef;
  @ViewChild('editorDiv') editorDiv: ElementRef;

  private destroy$ = new Subject();

  docMode$ = this.store.pipe(
    select(fromMarkdown.selectDocumentModeState),
    takeUntil(this.destroy$)
  );
  showEdit$ = this.docMode$.pipe(
    map(mode => {
      return mode === DocumentMode.Edit;
    })
  );

  isScreenWide$ = this.utils.isScreenWide$;
  showView$ = this.showEdit$.pipe(
    combineLatest(this.isScreenWide$),
    map(([isShowEdit, wide]) => {
      if (isShowEdit) {
        if (!wide) {
          return false;
        }
      }
      return true;
    })
  );

  markdown$: Observable<string>;

  private docShowSub: any;

  constructor(
    private _docService: DocService,
    private _el: ElementRef,
    private _editorService: MarkdownEditorService,
    private docSaveCoodinator: DocSaveCoordinateService,
    private _http: HttpClient,
    @Inject(APP_BASE_HREF) private baseHref,
    private changeDetecorRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromMarkdown.State>,
    private state: State<fromMarkdown.State>,
    private utils:Utilities,
    private docRef: DocumentRef
  ) {}

  ngOnInit() {
    this.markdown$ = merge(
      this.store.select<Document>(selectCurrentDocumentState).pipe(
        map(doc => {
          if (doc && doc.content) {
            return base64Decode(doc.content.content);
          } else {
            return '';
          }
        })
      ),
      <Observable<string>>this.editor.markdownChange
    ).pipe(share());
  }

  ngOnDestroy() {
    this.store.dispatch(new SetCurrentDocumentId({ id: undefined }));
    this.destroy$.next();
  }

  canDeactivate(): Observable<boolean> | boolean {
    return this.editor.canDeactivate();
  }

  ngAfterViewChecked() {
    this.changeDetecorRef.detectChanges();
  }

  ngAfterViewInit() {
    this.route.queryParamMap
      .pipe(
        tap(params => {
          if (this.router.url.startsWith('/doc/new')) {
            let format = params.get('f');
            this.store.dispatch(new DocumentEffectsNew({ format }));
            this.store.dispatch(new document.EditMode());
          } else {
            let title = params.get('title');
            let num = +params.get('id');
            let format = params.get('f');
            let doc = getDocumentByIdSeletor(num)(this.state.value);
            if (doc && doc.content) {
              this.store.dispatch(new SetCurrentDocumentId({ id: num }));
            } else {
              this.refresh(num, title, format);
            }
          }
        }),
        take(1)
      )
      .subscribe();
  }

  refresh(num, title, format) {
    this.store.dispatch(new DocumentEffectsShow({ number: num, title, format }));
  }

  onRefresh(event) {
    if (this.router.url.startsWith('/doc/new')) return;
    const params = this.router.parseUrl(this.router.url).queryParams;
    let title = params['title'];
    let num = +params['id'];
    let format = params['f'];
    this.refresh(num, title, format);
  }

  showDemo() {
    this._http
      .get(`${this.baseHref}assets/markdown.md`, { responseType: 'text' })
      .subscribe(a => {});
  }
}
