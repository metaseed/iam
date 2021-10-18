import * as doc from './state/actions/document';
import { Component, OnInit, ViewChild, Inject, ElementRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { map, tap, combineLatestWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DocFormat, backOffAfter } from 'core';
import { Store, select } from '@ngrx/store';
import * as fromMarkdown from './state';
import { ChangeDetectorRef } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { MarkdownViewerContainerComponent } from './viewer/markdown-viewer-container.component';
import { Observable, merge } from 'rxjs';
import {
  DocumentEffectsCreate,
  SetCurrentDocumentId,
  DocumentEffectsRead,
  selectCurrentDocumentContentString
} from 'shared';
import { Utilities } from '../core/utils';
import { DocumentMode, IMarkdownStore, MARKDOWN_STORE_TOKEN } from './model/markdown.model';

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

  showEdit$ = this.markdownStore.documentMode_.pipe(
    map(mode => mode === DocumentMode.Edit)
  );

  showView$ = merge(
    this.showEdit$.pipe(
      combineLatestWith(this.utils.isWideScreen$),
      map(([isShowEdit, wide]) => {
        if (isShowEdit && !wide) {
          this.markdownStore.editWithPreview_.next(false);
            return false;
        }
        this.markdownStore.editWithPreview_.next(true);
        return true;
      })
    ),
    this.markdownStore.editWithPreview_
  );

  markdown$: Observable<string>;

  constructor(
    @Inject(MARKDOWN_STORE_TOKEN) public markdownStore: IMarkdownStore,
    private _http: HttpClient,
    @Inject(APP_BASE_HREF) private baseHref,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private store: Store<any>,
    private utils: Utilities
  ) { }

  ngOnInit() {
    this.router.routerState.root.firstChild.queryParams.subscribe(e=>{
      console.log(e)
    })
    this.markdown$ = merge(
      this.store.select<string>(selectCurrentDocumentContentString),
      this.markdownStore.editorContentChanged_
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
            this.markdownStore.documentMode_.next(DocumentMode.Edit);

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
