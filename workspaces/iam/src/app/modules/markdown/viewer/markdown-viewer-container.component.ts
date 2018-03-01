import { Component, Input, AfterViewInit } from "@angular/core";
import { Scrollable } from "core";
import { ViewChild } from "@angular/core";
import * as markdown from '../reducers';
import * as fromView from '../actions/view';
import { Store, select } from "@ngrx/store";
import { DocService } from "docs";
import { ElementRef } from "@angular/core";
import { Subscription } from "rxjs/Subscription";

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
    showDocSubscription: Subscription;

    @Input()
    markdown: string;
    @Input()
    hideToolbar: false;
    @ViewChild('viewContainerDiv')
    viewerContainerDiv: ElementRef;
    docLoaded = false;
    isEditorScrollDown$;

    constructor(private store: Store<markdown.State>, private _docService: DocService) {


    }
    isScrollDown = false;
    ngAfterViewInit() {
        this.isEditorScrollDown$ = this.store.pipe(select(markdown.selectEditScrollDownState));
        let me = this;
        let v_per_last = 0;
        this.isEditorScrollDown$.subscribe(value => {
            if (value.scroll) {
                let edit_div = value.scroll.target;
                let v_per = edit_div.scrollTop / (edit_div.scrollHeight - edit_div.clientHeight);
                let delta_per = v_per - v_per_last;
                v_per_last = v_per;
                let view_div = me.viewerContainerDiv.nativeElement;
                let delta_v_view = (view_div.scrollHeight - view_div.clientHeight) * delta_per;
                me.viewerContainerDiv.nativeElement.scrollTop += delta_v_view;
            }
        })
        this.showDocSubscription = this._docService.docShow$.subscribe(doc => {
            this.docLoaded = true;
            new Scrollable(this.viewerContainerDiv.nativeElement).
                isScrollDown$.subscribe((e) => {
                    this.store.dispatch(new fromView.ScrollDown(e));
                    // console.log(e)
                    this.isScrollDown = e.isDown;
                });
        });
    }

    ngOnDestroy() {
        if (this.showDocSubscription) {
            this.showDocSubscription.unsubscribe();
        }
    }
}