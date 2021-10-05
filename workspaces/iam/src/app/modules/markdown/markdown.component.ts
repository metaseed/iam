import * as doc from './state/actions/document';
import { Component, OnInit, ViewChild, Inject, ElementRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { map, tap, takeUntil, combineLatest, filter, combineLatestWith } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { DocFormat, backOffAfter } from 'core';
import { Store, select } from '@ngrx/store';
import * as fromMarkdown from './state';
import { DocumentMode } from './state/reducers/document';
import * as document from './state/actions/document';
import { ChangeDetectorRef } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { MarkdownViewerContainerComponent } from './viewer/markdown-viewer-container.component';
import { Observable, Subject, merge } from 'rxjs';
import {
  selectCurrentDocument,
  DocumentEffectsCreate,
  SetCurrentDocumentId,
  DocumentEffectsRead
} from 'shared';
import {Document} from 'core';
import { Utilities } from '../core/utils';
import { IMarkdownContainerService, MARKDOWN_CONTAINER_SERVICE_TOKEN } from './model/markdown.model';

@Component({
  selector: 'ms-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss']
})
export class MarkdownComponent implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked {
  isFullScreen: boolean;
  fixEditButton = false;
  @ViewChild(MarkdownViewerContainerComponent)
  viewer: MarkdownViewerContainerComponent;
  @ViewChild('viewerDiv')
  viewerDiv: ElementRef;
  @ViewChild('editorDiv')
  editorDiv: ElementRef;

  docMode$ = this.store.pipe(
    select(fromMarkdown.selectDocumentModeState),
  );

  showEdit$ = this.docMode$.pipe(
    map(mode => mode === DocumentMode.Edit)
  );

  isScreenWide$ = this.utils.isWideScreen$;
  showView$ = merge(
    this.showEdit$.pipe(
      combineLatestWith(this.isScreenWide$),
      map(([isShowEdit, wide]) => {
        if (isShowEdit && !wide) {
            this.store.dispatch(new doc.HidePreview());
            return false;
        }
        this.store.dispatch(new doc.ShowPreview());
        return true;
      })
    ),
    this.store.select(fromMarkdown.selectDocumentShowPreviewState)
  );

  markdown$: Observable<string>;

  constructor(
    @Inject(MARKDOWN_CONTAINER_SERVICE_TOKEN) public markdownService: IMarkdownContainerService,
    private _http: HttpClient,
    @Inject(APP_BASE_HREF) private baseHref,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private store: Store<fromMarkdown.MarkdownState>,
    private utils: Utilities
  ) { }

  ngOnInit() {
    this.router.routerState.root.firstChild.queryParams.subscribe(e=>{
      console.log(e)
    })
    this.markdown$ = merge(
      this.store.select<Document>(selectCurrentDocument).pipe(
        filter(doc => doc && !doc.isUpdateMeta),
        map(doc => {
          if (!doc.content) return '';
          return doc.content.content;
        })
      ),
      this.markdownService.editorContentChanged$
    ).pipe(backOffAfter<string>(80, 1000));

  }

  ngOnDestroy() {
    this.store.dispatch(new SetCurrentDocumentId({ id: undefined }));
  }

  ngAfterViewChecked() {
    this.changeDetectorRef.detectChanges();
  }

  ngAfterViewInit() {
    this.router.routerState.root.firstChild.queryParams
      .pipe(
        tap(params => {
          if (this.router.url.startsWith('/doc/new')) {
            const format = params['f'] as DocFormat;
            this.store.dispatch(new DocumentEffectsCreate({ format }));
            this.store.dispatch(new document.EditMode());
          } else {
            const title = params['title'];
            const num = +params['id']
            const format = params['f'];
            this.store.dispatch(new DocumentEffectsRead({ id: num, title, format }));
          }
        })
      )
      .subscribe();
    // setTimeout(_ => (this.viewerDiv.nativeElement as HTMLElement).focus(), 1000);
  }

  showDemo() {
    this._http
      .get(`${this.baseHref}assets/markdown.md`, { responseType: 'text' })
      .subscribe(() => { });
  }
}
