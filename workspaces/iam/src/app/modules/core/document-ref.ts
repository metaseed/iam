import { Injectable, Inject } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';

import { DOCUMENT } from '@angular/platform-browser';
import { debounceTime, map } from 'rxjs/operators';
import { getCurrentDebugContext } from '@angular/core/src/view/services';
import { Scrollable } from './services/scrollable';

@Injectable()
export class DocumentRef extends Scrollable {
  constructor(@Inject(DOCUMENT) private _document: Document) {
    super(_document.documentElement);
  }

  get nativeDocument(): Document {
    return this._document;
  }

  get height() {
    const doc = this._document;
    const body = doc.body; // For Safari
    const html = doc.documentElement; // For Chrome, Firefox, IE and Opera
    const height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    return height;
  }
}
