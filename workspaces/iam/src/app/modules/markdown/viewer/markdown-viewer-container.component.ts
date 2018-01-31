import { Component, Input, AfterViewInit } from "@angular/core";
import { Scrollable } from "core";
import { ViewChild } from "@angular/core";
import * as markdown from '../reducers';
import * as fromView from '../actions/view';
import { Store } from "@ngrx/store";

@Component({
    selector: 'markdown-viewer-container',
    template: `
    <ms-reader-toolbar *ngIf="!hideToolbar"></ms-reader-toolbar>
    <ms-reading-position-indicator [element]="viewContainerDiv"></ms-reading-position-indicator>
    <div style="position:absolute;width:100%">
        <div class="viewer-container" #viewContainerDiv>
            <markdown-viewer [model]="markdown"></markdown-viewer>
        </div>
    </div>
    `,
    styles: [`
        .viewer-container {
            width:100%;
            height:100vh;
            overflow-y:auto;
            overflow-x:auto;
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

    constructor(private store: Store<markdown.State>) {


    }

    ngAfterViewInit() {
        new Scrollable(this.viewerContainerDiv.nativeElement).
            isScrollDown$.subscribe((e) => {
                this.store.dispatch(new fromView.ScrollDown(e));
                // console.log(e)
            });
    }
}