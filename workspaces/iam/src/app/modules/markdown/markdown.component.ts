import * as doc from './actions/document';
import { Component, OnInit, ViewChild, Inject, HostListener, ElementRef } from '@angular/core';
// import { AceEditorDirective } from './editor/markdown-editor.directive';
import { MarkdownViewerComponent } from './viewer/markdown-viewer.component';
import { HttpClient } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { take, map, timeout, tap, takeUntil, combineLatest } from 'rxjs/operators';
import { DocService } from 'docs';
import { MarkdownEditorService } from './editor/index';
import { ActivatedRoute, Router } from '@angular/router';
import { base64Decode, DocumentRef, Scrollable } from 'core';
import { Store, select } from '@ngrx/store';
import * as fromMarkdown from './reducers';
import * as fromView from './actions/view';
import { DocumentMode } from './reducers/document';
import * as document from './actions/document';
import { ChangeDetectorRef } from '@angular/core';
import { MarkdownEditorComponent } from './editor/markdown-editor.component';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { OnDestroy } from '@angular/core';
import { MarkdownViewerContainerComponent } from './viewer/markdown-viewer-container.component';
import { HasElementRef } from '@angular/material/core/typings/common-behaviors/color';
import { Observable, Subscription, Subject } from 'rxjs';
import { DocSaveCoordinateService } from './editor/services/doc-save-coordinate-service';
import { DocumentEffectsShow, getCurrentDocumentState, DocumentEffectsNew } from '../docs/state';
import { Document } from '../docs/models/document';

@Component({
  selector: 'ms-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss']
})
export class MarkdownComponent implements OnInit, OnDestroy {
  private docShowSub: any;
  private _doc: any;
  private destroy$ = new Subject();
  isFullScreen: boolean;
  fixEditButton = false;
  isEditMode = false;
  isNewDoc = false;
  showPreviewPanel = true;
  DocumentMode = DocumentMode;
  @ViewChild(MarkdownEditorComponent) editor: MarkdownEditorComponent;
  @ViewChild(MarkdownViewerContainerComponent) viewer: MarkdownViewerContainerComponent;
  @ViewChild('viewerDiv') viewerDiv: ElementRef;
  @ViewChild('editorDiv') editorDiv: ElementRef;


  docMode$ = this.store.pipe(select(fromMarkdown.selectDocumentModeState),takeUntil(this.destroy$))
  editWithView$ = this.store.pipe(select(fromMarkdown.selectDocumentShowPreviewState),takeUntil(this.destroy$))
  gtsmBreakPoint = false

  markdown:string;
  markdown$ = this.store.select<Document>(getCurrentDocumentState).pipe(
    map(doc => {
      if (doc && doc.content){
        return base64Decode(doc.content.content);
      }
      else {
        return '';
      }
    })
  ).subscribe(content=>{
    this.markdown = content;
  });
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
    private media: ObservableMedia,
    private docRef: DocumentRef
  ) {
    media.asObservable().pipe(combineLatest(this.editWithView$),takeUntil(this.destroy$)).subscribe(([change,editWithView]) => {
      if (!['xs', 'sm'].includes(change.mqAlias)) {
        this.gtsmBreakPoint = true;
        if (editWithView === null || editWithView === undefined) {
          this.store.dispatch(new doc.ShowPreview());
        }
      } else {
        this.gtsmBreakPoint = false;
      }
    });

  }

  ngOnInit() {

  }

  ngOnDestroy() {
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
          if (this.router.url.startsWith( '/doc/new')) {
            let format = params.get('f');
            this.store.dispatch(new DocumentEffectsNew({format}));
            this.store.dispatch(new document.EditMode());
          } else {
            let title = params.get('title');
            let num = +params.get('id');
            let format = params.get('f');
            this.store.dispatch(
              new DocumentEffectsShow({ number:num, title, format })
            );
          }
        }),
        take(1)
      )
      .subscribe();
  }

  showDemo() {
    this._http.get(`${this.baseHref}assets/markdown.md`, { responseType: 'text' }).subscribe(a => {
    });
  }
}
