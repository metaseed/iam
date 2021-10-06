import { Injectable, Inject } from '@angular/core';
import { ContainerRef } from './container-ref';
import { DOCUMENT } from '@angular/common';

@Injectable({providedIn:'root'})
export class DocumentRef extends ContainerRef {

  constructor(@Inject(DOCUMENT) private _document: Document) {
    super(_document);
  }

  get document(): Document {
    return this._document;
  }

}
