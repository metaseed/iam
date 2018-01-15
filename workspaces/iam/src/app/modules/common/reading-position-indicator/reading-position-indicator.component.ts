import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DocumentRef, WindowRef } from 'core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MdcLinearProgress } from '@angular-mdc/web';

@Component({
    selector: 'meta-reading-position-indicator',
    templateUrl: './reading-position-indicator.component.html',
    styleUrls: ['./reading-position-indicator.component.scss']
})
export class ReadingPositionIndicatorComponent implements OnInit, AfterViewInit {

    @ViewChild(MdcLinearProgress) progressBar: MdcLinearProgress;

    constructor(private _docRef: DocumentRef, private _windowRef: WindowRef) { }

    ngOnInit() {

    }
    ngAfterViewInit() {
        this._docRef.scroll$.subscribe(() => {
            this.setProgress()
        });

        this._windowRef.resize$.subscribe(() => this.setProgress());
    }
    private setProgress() {
        const position = this.Value;
        const length = this.Max;
        const value = position / length;
        this.progressBar.setProgress(value);

    }

    private get Max() {
        return this._docRef.height - this._windowRef.nativeWindow.innerHeight;
    }

    private get Value() {
        return this._windowRef.nativeWindow.scrollY;
    }

}

