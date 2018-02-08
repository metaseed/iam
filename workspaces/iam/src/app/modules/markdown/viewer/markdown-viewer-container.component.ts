import { Component, Input, AfterViewInit } from "@angular/core";
import { Scrollable } from "core";
import { ViewChild } from "@angular/core";
import * as markdown from '../reducers';
import * as fromView from '../actions/view';
import { Store } from "@ngrx/store";
import { DocService } from "docs";

@Component({
    selector: 'markdown-viewer-container',
    template: `
    <ms-reader-toolbar *ngIf="!hideToolbar"></ms-reader-toolbar>
    <ms-reading-position-indicator *ngIf="isScrollDown" [element]="viewContainerDiv"></ms-reading-position-indicator>
    <sk-three-bounce [isRunning]="!docLoaded"></sk-three-bounce>
    
    <div style="position:relative;height:100%;">
        <div class="viewer-container" #viewContainerDiv>
            <markdown-viewer [model]="markdown"></markdown-viewer>
        </div>
    </div>
    `,
    styles: [`
        .viewer-container {
            overflow-y:auto;
            overflow-x:auto;
            height:100%;
        }
    `]
})
export class MarkdownViewerContainerComponent implements AfterViewInit {

    @Input()
    markdown: string;
    @Input()
    hideToolbar: false;
    @ViewChild('viewContainerDiv')
    viewerContainerDiv;
    docLoaded = false;

    constructor(private store: Store<markdown.State>, private _docService: DocService) {


    }
    isScrollDown = false;
    ngAfterViewInit() {
        this._docService.onShowDoc(doc => {
            this.docLoaded = true;
            new Scrollable(this.viewerContainerDiv.nativeElement).
                isScrollDown$.subscribe((e) => {
                    this.store.dispatch(new fromView.ScrollDown(e));
                    // console.log(e)
                    this.isScrollDown = e;
                });
        });
    }
}