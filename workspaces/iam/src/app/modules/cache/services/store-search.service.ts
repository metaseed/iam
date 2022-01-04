import { Injectable } from '@angular/core';
import Fuse from 'fuse.js';
import { DocMeta, ISearchItem, SearchResultSource } from 'core';
import { min, of } from 'rxjs';
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
    const margin = 30;
    function getFragment(value: string, indices: ReadonlyArray<Fuse.RangeTuple>) {
      const text_matches = [];
      let groupInIndex = 0;
      let i = 0;
      for ( ;i < indices.length - 1; i++) {
        if (indices[i][1] + margin < indices[i + 1][0]) {
          const indexesLow = indices[groupInIndex][0];
          const indexesHigh = indices[i][1];
          const low = Math.max(indexesLow - margin, 0);
          const high = Math.min(value.length, indexesHigh + 1 + margin);
          text_matches.push({ fragment: value.substring(low, high), matches: indices.slice(groupInIndex, i + 1).map(idx => ({ text: value.substring(idx[0], idx[1] + 1), indices: [idx[0]-low, idx[1] + 1-low]})) })
          groupInIndex = i + 1;
        }
      }
      const indexesLow = indices[groupInIndex][0];
      const indexesHigh = indices[i][1];
      const low = Math.max(indexesLow - margin, 0);
      const high = Math.min(value.length, indexesHigh + 1 + margin);
      text_matches.push({ fragment: value.substring(low, high), matches: indices.slice(groupInIndex, i + 1).map(idx => ({ text: value.substring(idx[0], idx[1] + 1), indices: [idx[0]-low, idx[1] + 1-low] })) })

      return text_matches;
    }
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
          id: +d.item.id,
          score: +(1 - d.score).toFixed(4), // 0-1
          title: d.item.meta.title ?? DocMeta.getTitle(d.item.content.content),
          text_matches: d.matches.map(m=>getFragment(m.value, m.indices)).flat(),
          source: SearchResultSource.store
        } as ISearchItem)
      );
    return of(sr);
  }
}
