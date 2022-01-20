import { Component, OnInit, ViewChild, Inject, ElementRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { map, tap, combineLatestWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DocFormat, backoff } from 'core';
import { ChangeDetectorRef } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { MarkdownViewerContainerComponent } from './viewer/markdown-viewer-container.component';
import { merge } from 'rxjs';
import { Utilities } from '../core/utils';
import { DocumentMode, IMarkdownStore, MARKDOWN_STORE_TOKEN } from './model/markdown.model';
import { DocumentsEffects, DOCUMENT_EFFECTS_TOKEN, DOC_HISTORY_VERSION_ID } from '../shared/store';
import { DocumentStore } from '../shared/store/document.store';

@Component({
  selector: 'ms-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss']
})
export class MarkdownComponent implements OnInit, OnDestroy, AfterViewChecked {
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

  markdown$ =
    this.store.currentDocContentString$.pipe(
      map(d => d ?? ''),
      backoff<string>(80, 1000)
    );

  constructor(
    @Inject(DOCUMENT_EFFECTS_TOKEN) private documentEffects: DocumentsEffects,
    @Inject(MARKDOWN_STORE_TOKEN) public markdownStore: IMarkdownStore,
    private _http: HttpClient,
    @Inject(APP_BASE_HREF) private baseHref,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private store: DocumentStore,
    private utils: Utilities
  ) { }

  ngOnInit() {
    this.router.routerState.root.firstChild.queryParams
      .pipe(
        tap(params => {
          if (this.router.url.startsWith('/doc/new')) {
            const format = params['f'] as DocFormat;
            this.documentEffects.createDocument_.next({ format });
            this.markdownStore.documentMode_.next(DocumentMode.Edit);

          } else {
            const title = params['title'];
            const id = +params['id']
            const format = params['f'];
            if (id === DOC_HISTORY_VERSION_ID && !this.store.currentDocContent$.state) {
              // if no content in store cache, means user F5 refresh the page with the history doc(id === -1) url.
              this.router.navigate(['home']);
            }
            this.documentEffects.readDocument_.next({ id, title, format });
            this.store.currentId_.next(id);

          }
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.store.currentId_.next(undefined);
  }

  ngAfterViewChecked() {
    this.changeDetectorRef.detectChanges();
  }

  showDemo() {
    this._http
      .get(`${this.baseHref}assets/markdown.md`, { responseType: 'text' })
      .subscribe(() => { });
  }
}
