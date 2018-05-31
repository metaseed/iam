import * as doc from './actions/document';
import { Component, OnInit, ViewChild, Inject, HostListener, ElementRef } from '@angular/core';
// import { AceEditorDirective } from './editor/markdown-editor.directive';
import { MarkdownViewerComponent } from './viewer/markdown-viewer.component';
import { HttpClient } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { take, map, timeout } from 'rxjs/operators';
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
import { Observable, Subscription } from 'rxjs';
import { DocSaveCoordinateService } from './editor/services/doc-save-coordinate-service';
import { DocumentEffectsShow, getCurrentDocumentState } from '../docs/state';
import { Document } from '../docs/models/document';

@Component({
  selector: 'ms-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss']
})
export class MarkdownComponent implements OnInit, OnDestroy {
  private docShowSub: any;
  private _doc: any;
  isFullScreen: boolean;
  fixEditButton = false;
  isEditMode = false;
  isNewDoc = false;
  showPreviewPanel = true;
  docLoaded = false;
  editorLoaded = false;
  mediaChangeSubscription: Subscription;
  @ViewChild(MarkdownEditorComponent) editor: MarkdownEditorComponent;
  @ViewChild(MarkdownViewerContainerComponent) viewer: MarkdownViewerContainerComponent;
  @ViewChild('viewerDiv') viewerDiv: ElementRef;
  @ViewChild('editorDiv') editorDiv: ElementRef;

  docMode$ = this.store.pipe(select(fromMarkdown.selectDocumentModeState));
  editWithView$ = this.store.pipe(select(fromMarkdown.selectDocumentShowPreviewState));
  gtsmBreakPoint = false;
  editWithView: boolean | null;

  markdown$ = this.store.select<Document>(getCurrentDocumentState).pipe(
    map(doc => {
      if (doc && doc.content){
        return base64Decode(doc.content.content);
      }
      else {
        return '';
      }
    })
  );
  // isSyncingLeftScroll = false;
  // isSyncingRightScroll = false;
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
    this.mediaChangeSubscription = media.subscribe((change: MediaChange) => {
      if (!['xs', 'sm'].includes(change.mqAlias)) {
        this.gtsmBreakPoint = true;
        if (this.editWithView === null || this.editWithView === undefined) {
          this.store.dispatch(new doc.ShowPreview());
        }
      } else {
        this.gtsmBreakPoint = false;
      }
    });
    _editorService.editorLoaded$.subscribe(() => {
      setTimeout(() => (this.editorLoaded = true), 0);
    });
  }

  ngOnInit() {
    let me = this;

    // this.editorDiv.nativeElement.onscroll = function () {
    //   if (!me.isSyncingLeftScroll) {
    //     me.isSyncingRightScroll = true;
    //     me.viewerDiv.nativeElement.scrollTop = this.scrollTop;
    //   }
    //   me.isSyncingLeftScroll = false;
    // }

    // this.viewerDiv.nativeElement.onscroll = function () {
    //   if (!me.isSyncingRightScroll) {
    //     me.isSyncingLeftScroll = true;
    //     me.editorDiv.nativeElement.scrollTop = this.scrollTop;
    //   }
    //   me.isSyncingRightScroll = false;
    // }
    if (this.router.url === '/doc/new') {
      //this.editModeChange(true, false);
      this.isNewDoc = true;
    }

    this.docShowSub = this._docService.docShow$.subscribe(doc => {
      if (doc === null) {
        return;
      }
      this._doc = doc;
      if (this.isNewDoc) {
        this.store.dispatch(new document.EditMode());
      }
      setTimeout(() => (this.docLoaded = true), 0);
    });
    this.docMode$.subscribe(mode => {
      switch (mode) {
        case DocumentMode.Edit: {
          this.isEditMode = true;
          break;
        }
        case DocumentMode.View: {
          this.isEditMode = false;
          break;
        }
      }
    });

    this.editWithView$.subscribe(mode => {
      this.editWithView = mode;
    });
  }

  ngOnDestroy() {
    if (this.mediaChangeSubscription) {
      this.mediaChangeSubscription.unsubscribe();
      this.mediaChangeSubscription = null;
    }
    if (this.docShowSub) {
      this.docShowSub.unsubscribe();
      this.docShowSub = null;
    }
  }

  canDeactivate(): Observable<boolean> | boolean {
    return this.editor.canDeactivate();
  }

  ngAfterViewChecked() {
    this.changeDetecorRef.detectChanges();
  }

  // @HostListener('window:scroll', ['$event'])
  // onScroll(event) {
  //   var viewportOffset = this._el.nativeElement.getBoundingClientRect();
  //   // these are relative to the viewport, i.e. the window
  //   this.fixEditButton = viewportOffset.top <= 10;
  // }
  ngAfterViewInit() {
    this._editorService.contentChanged$.subscribe(([content, editor]) => {
      let me = this;
      // function refresh() {//should be after viewer rendered its contents
      //   if (!me.editorDiv || !me.viewerDiv || !me.editor) { setTimeout(() => refresh(), 0); return; };
      //   me.editorDiv.nativeElement.style.height = me.viewerDiv.nativeElement.clientHeight + 'px';
      //   me.editor.editor.editor.layout();
      //   me.editor.editor.editor.focus();
      // }
      // refresh();
    });

    this.route.queryParamMap
      .pipe(
        map(params => {
          if (this.isNewDoc) {
            return this._docService.newDoc();
          } else {
            let title = params.get('title');
            let num = params.get('id');
            // return this._docService.showDoc(title, id);
            this.store.dispatch(
              new DocumentEffectsShow({ doc: { number:num, title, format: 'md' } })
            );
          }
        }, this),
        take(1)
      )
      .subscribe();
  }

  // modeChange(edit = false, view = false) {
  //   this.isEditMode = edit;
  //   if (edit && this.gtsmBreakPoint) {
  //     this.showPreviewPanel = true;
  //     return;
  //   }
  //   this.showPreviewPanel = view;

  // }

  showDemo() {
    this._http.get(`${this.baseHref}assets/markdown.md`, { responseType: 'text' }).subscribe(a => {
    });
  }
}
