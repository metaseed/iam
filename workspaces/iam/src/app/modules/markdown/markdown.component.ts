/// <reference path="../../../../../../node_modules/monaco-editor/monaco.d.ts" />
import { Component, OnInit, ViewChild, Inject, HostListener, ElementRef } from '@angular/core';
// import { AceEditorDirective } from './editor/markdown-editor.directive';
import { MarkdownViewerComponent } from './viewer/markdown-viewer.component';
import { HttpClient } from '@angular/common/http';
import { MonacoEditorComponent } from './editor/monaco-editor/monaco-editor.component';
import { APP_BASE_HREF } from '@angular/common';
import { timeout } from 'rxjs/operator/timeout';
import { take, map } from 'rxjs/operators';
import { setTimeout } from 'timers';
import { DocService } from 'docs';
import { MarkdownEditorService } from './editor/index';
import { ActivatedRoute, Router } from '@angular/router';
import { base64Decode, DocumentRef, Scrollable } from 'core';
import { Store, select } from '@ngrx/store';
import * as fromMarkdown from './reducers';
import * as fromView from './actions/view'
import { DocumentMode } from './reducers/document';
import { ChangeDetectorRef } from '@angular/core';
import { MarkdownEditorComponent } from './editor/markdown-editor.component';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'ms-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss']
})
export class MarkdownComponent implements OnInit, OnDestroy {
  private _text: string;
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
  @ViewChild(MarkdownViewerComponent) viewer: MarkdownViewerComponent;
  @ViewChild('viewerDiv') viewerDiv;
  @ViewChild('editorDiv') editorDiv;

  docMode$ = this.store.pipe(select(fromMarkdown.selectDocumentModeState));
  gtsmBreakPoint = false;

  constructor(private _docService: DocService,
    private _el: ElementRef,
    private _editorService: MarkdownEditorService,
    private _http: HttpClient,
    @Inject(APP_BASE_HREF) private baseHref,
    private changeDetecorRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromMarkdown.State>,
    private media: ObservableMedia,
    private docRef: DocumentRef) {
    this.mediaChangeSubscription = media.subscribe((change: MediaChange) => {
      if (!['xs', 'sm'].includes(change.mqAlias)) {
        this.showPreviewPanel = this.gtsmBreakPoint = true;
      } else {
        this.showPreviewPanel = this.gtsmBreakPoint = false;
      }

    });
    _editorService.editorLoaded$.subscribe(() => {
      setTimeout(() => this.editorLoaded = true, 0);
    });
  }

  ngOnInit() {
    this.docMode$.subscribe(mode => {
      switch (mode) {
        case DocumentMode.Edit: {
          this.modeChange(true, false)
          break;
        }
        case DocumentMode.View: {
          this.modeChange(false, true);
          break;

        }
      }
    });
  }

  ngOnDestroy() {
    if (this.mediaChangeSubscription) {
      this.mediaChangeSubscription.unsubscribe();
      this.mediaChangeSubscription = null;
    }
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
    this._docService.onShowDoc((doc) => {
      if (doc === null) {
        this._text = '';
        return;
      }
      this._text = base64Decode(doc.content.content);
      this._doc = doc;
      if (this.isNewDoc) {
        this.modeChange(true, false)
      }
      setTimeout(() => this.docLoaded = true, 0);
    });
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
    if (this.router.url === '/doc/new') {
      //this.editModeChange(true, false);
      this.isNewDoc = true;
    }
    this.route.queryParamMap.pipe(
      map(params => {
        if (this.isNewDoc) {
          return this._docService.newDoc();
        } else {
          let title = params.get('title');
          let id = params.get('id');
          return this._docService.showDoc(title, id);
        }
      }, this
      ),
      take(1))
      .subscribe();
  }


  modeChange(edit = false, preview = false) {
    this.isEditMode = edit;
    if (edit && this.gtsmBreakPoint) {
      this.showPreviewPanel = true;
      return;
    }
    this.showPreviewPanel = preview;

  }

  showDemo() {
    this._http.get(`${this.baseHref}assets/markdown.md`, { responseType: 'text' }).subscribe(a => {
      this._text = a;
    });
  }

  public get markdown(): string {
    return this._text;
  }
  public set markdown(text) {
    this._text = text;
    this._doc && (this._doc.body = text);
  }

}
