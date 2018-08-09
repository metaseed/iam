import * as doc from './state/actions/document';
import { Component, OnInit, ViewChild, Inject, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { take, map, tap, takeUntil, combineLatest } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { DocFormat, backoff } from 'core';
import { Store, select } from '@ngrx/store';
import * as fromMarkdown from './state';
import { DocumentMode } from './state/reducers/document';
import * as document from './state/actions/document';
import { ChangeDetectorRef } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { MarkdownViewerContainerComponent } from './viewer/markdown-viewer-container.component';
import { Observable, Subject, merge } from 'rxjs';
import {
  selectCurrentDocumentState,
  DocumentEffectsCreate,
  SetCurrentDocumentId,
  DocumentEffectsRead
} from 'shared';
import { Document } from 'core';
import { Utilities } from '../core/utils';
import { IMarkdownService, MARKDOWN_SERVICE_TOKEN } from './model/markdown.model';

@Component({
  selector: 'ms-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss']
})
export class MarkdownComponent implements OnInit, OnDestroy {
  isFullScreen: boolean;
  fixEditButton = false;
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
    @Inject(MARKDOWN_SERVICE_TOKEN) public markdownService: IMarkdownService,
    private _http: HttpClient,
    @Inject(APP_BASE_HREF) private baseHref,
    private changeDetecorRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromMarkdown.MarkdownState>,
    private utils: Utilities
  ) {}

  ngOnInit() {
    this.markdown$ = merge(
      this.store.select<Document>(selectCurrentDocumentState).pipe(
        map(d => {
          if (d && d.content) {
            return d.content.content;
          } else {
            return '';
          }
        })
      ),
      this.markdownService.editorContentChanged$
    ).pipe<string>(backoff(80, 1000));
  }

  ngOnDestroy() {
    this.store.dispatch(new SetCurrentDocumentId({ id: undefined }));
    this.destroy$.next();
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
            const title = params.get('title');
            const num = +params.get('id');
            const format = params.get('f');
            this.store.dispatch(new DocumentEffectsRead({ id: num, title, format }));
          }
        }),
        take(1)
      )
      .subscribe();
  }

  showDemo() {
    this._http
      .get(`${this.baseHref}assets/markdown.md`, { responseType: 'text' })
      .subscribe(() => {});
  }
}
