import { Component, Input, AfterViewInit } from "@angular/core";
import { Scrollable } from "core";
import { ViewChild } from "@angular/core";
import * as markdown from '../reducers';
import * as fromView from '../actions/view';
import { Store } from "@ngrx/store";

@Component({
    selector: 'markdown-viewer-container',
    template: `
    <ms-reading-position-indicator [element]="viewContainerDiv"></ms-reading-position-indicator>
    <div style="position:absolute">
        <div class="viewer-container" #viewContainerDiv>
            <markdown-viewer [model]="markdown"></markdown-viewer>
        </div>
    </div>
    `,
    styles: [`
        .viewer-container {
            width:100vw;
            height:100vh;
            overflow-y:auto;
        }
    `]
})
export class MarkdownViewerContainerComponent implements AfterViewInit {

    @Input()
    markdown: string;

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