
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
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

    get height() {
        const doc = this.nativeDocument;
        const body = doc.body;
        const html = doc.documentElement;
        const height = Math.max(body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight);
        return height;
    }
}