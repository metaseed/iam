import { Injectable } from '@angular/core';
import * as Fuse from 'fuse.js';
import { Document, ISearchItem, SearchResultSource } from 'core';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

@Injectable()
export class StoreSearchService {
  constructor(private _store: Store<any>) {}

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

  search(docs: Document[], keyword: string) {
    const fuse = new Fuse(docs, <any>this.options);
    const sr = fuse
      .search(
        // <{
        //   item: Document;
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
            title: d.item.metaData.title,
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
