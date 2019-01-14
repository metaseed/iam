export interface ITextMatche {
  fragment: string;
  matches: [{ text: string; indices: [number, number] }];
}

export enum SearchResultSource {
  store,
  indexdb,
  netCode,
  netIssue
}
export interface ISearchItem {
  id: number;
  // 0-1;
  score: number;
  title: string;
  text_matches: ITextMatche[];
  source?: SearchResultSource;
}

export type SearchResult = ISearchItem[];
