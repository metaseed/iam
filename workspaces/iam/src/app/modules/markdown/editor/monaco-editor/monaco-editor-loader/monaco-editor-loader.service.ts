import { Injectable, NgZone, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { APP_BASE_HREF } from '@angular/common';

@Injectable()
export class MonacoEditorLoaderService {

    private _monacoPath = `${this.baseHref.slice(1)}assets/monaco-editor/vs`;
    isMonacoLoaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    set monacoPath(value) {
        if (value) {
            this._monacoPath = value;
        }
    }

    constructor(ngZone: NgZone, @Inject(APP_BASE_HREF) private baseHref: string) {
        var onGotAmdLoader = () => {
            if (typeof ((<any>window).monaco) === 'object') {
                ngZone.run(() => this.isMonacoLoaded.next(true));
                return;
            }
            (<any>window).require.config({ paths: { 'vs': this._monacoPath } });
            (<any>window).require(['vs/editor/editor.main'], () => {
                ngZone.run(() => this.isMonacoLoaded.next(true));
            });
        };

        // Load AMD loader if necessary
        if (!(<any>window).require) {
            var loaderScript = document.createElement('script');
            loaderScript.type = 'text/javascript';
            loaderScript.src = `${this._monacoPath}/loader.js`;
            loaderScript.addEventListener('load', onGotAmdLoader);
            document.body.appendChild(loaderScript);
        } else {
            onGotAmdLoader();
        }
    }
}
