import { Injectable } from '@angular/core';
import Fuse from 'fuse.js';
import { DocContent, DocMeta, Document, ISearchItem, SearchResultSource } from 'core';
import { of } from 'rxjs';
import { DocMetaContent, DocMetaContentRecord } from 'app/modules/shared/store/document.store';

@Injectable()
export class StoreSearchService {

  private readonly options = {
    shouldSort: true,
    includeScore: true,
    includeMatches: true,
    keys: [
      { name: 'meta.title', weight: 0.4 },
      { name: 'meta.summary', weight: 0.3 },
      { name: 'content.content', weight: 0.3 }
    ]
  };

  search(docs: DocMetaContentRecord, keyword: string) {
    const fuse = new Fuse(Object.values(docs), <any>this.options);
    const sr = fuse
    // {
    //   item: DocMetaContent;
    //   score: number;
    //   matches: [
    //     {
    //       indices: Array<[number, number]>;
    //       key: string;
    //       value: string;
    //     }
    //   ];
    // }
      .search<DocMetaContent>(keyword)
      .map(
        d =>
        ({
          id: d.item.id,
          score: 1 - d.score, // 0-1
          title: d.item.meta.title??DocMeta.getTitle(d.item.content.content),
          text_matches: d.matches.map(m => ({
            fragment: m.value,
            matches: m.indices.map(idx => ({ text: m.value.substring(idx[0],idx[1]+1), indices: [idx[0], idx[1]+1] }))
          })),
          source: SearchResultSource.store
        } as ISearchItem)
      );
    return of(sr);
  }
}
