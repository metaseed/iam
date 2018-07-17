import * as doc from './state/actions/document';
import { Component, OnInit, ViewChild, Inject, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { take, map, tap, takeUntil, combineLatest, share } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { DocFormat } from 'core';
import { Store, select, State } from '@ngrx/store';
import * as fromMarkdown from './state';
import { DocumentMode } from './state/reducers/document';
import * as document from './state/actions/document';
import { ChangeDetectorRef } from '@angular/core';
import { MarkdownEditorComponent } from './editor/markdown-editor.component';
import { OnDestroy } from '@angular/core';
import { MarkdownViewerContainerComponent } from './viewer/markdown-viewer-container.component';
import { Observable, Subject, merge } from 'rxjs';
import {
  selectCurrentDocumentState,
  DocumentEffectsCreate,
  SetCurrentDocumentId
} from '../home/state';
import { Document } from 'core';
import { Utilities } from '../core/utils';
import { MarkdownService } from './markdown.service';

@Component({
  selector: 'ms-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss']
})
export class MarkdownComponent implements OnInit, OnDestroy {
  DocumentMode=DocumentMode;
  isFullScreen: boolean;
  fixEditButton = false;
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
  showView$ = merge(
    this.showEdit$.pipe(
      combineLatest(this.isScreenWide$),
      map(([isShowEdit, wide]) => {
        if (isShowEdit) {
          if (!wide) {
            this.store.dispatch(new doc.HidePreview());
            return false;
          }
        }
        this.store.dispatch(new doc.ShowPreview());
        return true;
      })
    ),
    this.store.select(fromMarkdown.selectDocumentShowPreviewState)
  );

  markdown$: Observable<string>;

  constructor(
    private markdownSerive: MarkdownService,
    private _http: HttpClient,
    @Inject(APP_BASE_HREF) private baseHref,
    private changeDetecorRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromMarkdown.State>,
    private utils: Utilities  ) {}

  ngOnInit() {
    this.markdown$ = merge(
      this.store.select<Document>(selectCurrentDocumentState).pipe(
        map(doc => {
          if (doc && doc.content) {
            return doc.content.content;
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
            const format = params.get('f') as DocFormat;
            this.store.dispatch(new DocumentEffectsCreate({ format }));
            this.store.dispatch(new document.EditMode());
          } else {
            let title = params.get('title');
            let num = +params.get('id');
            let format = params.get('f');
            this.markdownSerive.refresh(num, title, format);
          }
        }),
        take(1)
      )
      .subscribe();
  }

  showDemo() {
    this._http
      .get(`${this.baseHref}assets/markdown.md`, { responseType: 'text' })
      .subscribe(() => { });
  }
}
