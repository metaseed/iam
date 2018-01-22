
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs/Observable';

import { debounceTime, map } from 'rxjs/operators';
import { getCurrentDebugContext } from '@angular/core/src/view/services';
function _document(): any {
    // return the native document obj
    return document;
}

@Injectable()
export class DocumentRef {

    get nativeDocument(): Document {
        return _document();
    }

    get scroll$() {
        const obs = fromEvent(this.nativeDocument, 'scroll');
        return obs;
    }

    get isScrollDown$() {
        let lastValue = this.nativeDocument.documentElement.scrollTop;
        return this.scroll$.pipe(
            map((event) => {
                const currentValue = this.nativeDocument.documentElement.scrollTop;
                if (currentValue > lastValue) {
                    lastValue = currentValue;
                    return true;
                }
                lastValue = currentValue;
                return false;
            }, this),
            debounceTime(300)
        );
    }

    get height() {
        const doc = this.nativeDocument;
        const body = doc.body;
        const html = doc.documentElement;
        const height = Math.max(body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight);
        return height;
    }
}