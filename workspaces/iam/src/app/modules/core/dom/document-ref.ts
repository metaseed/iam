import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { ContainerRef } from './container';

@Injectable()
export class DocumentRef extends ContainerRef {

  constructor(@Inject(DOCUMENT) private _document: Document) {
    super(_document.documentElement);
  }

  get document(): Document {
    return this._document;
  }

}
