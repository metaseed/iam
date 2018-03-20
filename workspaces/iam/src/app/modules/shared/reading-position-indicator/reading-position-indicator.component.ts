import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { DocumentRef, WindowRef, Scrollable } from 'core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MdcLinearProgress } from '@angular-mdc/web';

@Component({
    selector: 'ms-reading-position-indicator',
    templateUrl: './reading-position-indicator.component.html',
    styleUrls: ['./reading-position-indicator.component.scss']
})
export class ReadingPositionIndicatorComponent implements OnInit, AfterViewInit {

    @ViewChild(MdcLinearProgress) progressBar: MdcLinearProgress;

    constructor(private _docRef: DocumentRef, private _windowRef: WindowRef) { }

    ngOnInit() {

    }

    @Input()
    element: HTMLElement;

    ngAfterViewInit() {
        new Scrollable(this.element).scroll$.subscribe((event) => {
            this.setProgress(event)
        });

        this._windowRef.resize$.subscribe((event) => this.setProgress(event));
    }
    private setProgress(event) {
        const position = this.Value;
        const length = this.Max;
        const value = position / length;
        this.progressBar.setProgress(value);
        // console.log(event);
    }

    private get Max() {
        return this.element.scrollHeight - this.element.clientHeight;
    }

    private get Value() {
        return this.element.scrollTop;
    }

}

