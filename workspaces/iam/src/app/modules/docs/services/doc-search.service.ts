import { Injectable } from '@angular/core';
import * as Fuse from 'fuse.js';

@Injectable()
export class DocSearchService {
  private readonly options = {
    keys: [
      { name: 'metaData.title', weight: 0.4 },
      { name: 'metaData.summary', weight: 0.4 },
      { name: 'metaData.content.content', weight: 0.2 }
    ]
  };

  constructor() {}

  search(docs, keyword: string) {
    const fuse = new Fuse(docs, this.options);
    return fuse.search(keyword);
  }
}
