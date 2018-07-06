import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { ContainerRef } from './container-ref';

@Injectable()
export class DocumentRef extends ContainerRef {

  constructor(@Inject(DOCUMENT) private _document: Document) {
    super(_document);
  }

  get document(): Document {
    return this._document;
  }

}
