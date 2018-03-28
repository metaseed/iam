import { fromEvent } from "rxjs/observable/fromEvent";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { debounceTime, map } from "rxjs/operators";
import { getCurrentDebugContext } from "@angular/core/src/view/services";
import { Scrollable } from "./services/scrollable";
function _document(): any {
  // return the native document obj
  return document;
}

@Injectable()
export class DocumentRef extends Scrollable {
  constructor() {
    super(_document().documentElement);
  }

  get nativeDocument(): Document {
    return _document();
  }

  get height() {
    const doc = this.nativeDocument;
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
