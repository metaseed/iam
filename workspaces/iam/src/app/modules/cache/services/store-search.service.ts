import { Injectable } from '@angular/core';
import Fuse from 'fuse.js';
import { DocContent, DocMeta, Document, ISearchItem, SearchResultSource } from 'core';
import { of } from 'rxjs';

@Injectable()
export class StoreSearchService {

  private readonly options = {
    shouldSort: true,
    includeScore: true,
    includeMatches: true,
    keys: [
      { name: 'metaData.title', weight: 0.4 },
      { name: 'metaData.summary', weight: 0.4 },
      { name: 'metaData.content.content', weight: 0.2 }
    ]
  };

  search(docs: DocContent[], keyword: string) {
    const fuse = new Fuse(docs, <any>this.options);
    const sr = fuse
      .search(
        // <{
        //   item: DocContent;
        //   score: number;
        //   matches: [
        //     {
        //       indices: Array<[number, number]>;
        //       key: string;
        //       value: string;
        //     }
        //   ];
        // }>
        keyword
      )
      .map(
        (d: any) =>
          ({
            id: d.item.id,
            score: 1 - d.score, // 0-1
            title: DocMeta.getTitle(d.item.content),
            text_matches: d.matches.map(m => ({
              fragment: m.value,
              matches: m.indices.map(idx => ({ text: keyword, indices: idx }))
            })),
            source: SearchResultSource.store
          } as ISearchItem)
      );
    return of(sr);
  }
}
