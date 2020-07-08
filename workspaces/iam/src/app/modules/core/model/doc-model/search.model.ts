export interface ITextMatch {
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
  text_matches: ITextMatch[];
  source?: SearchResultSource;
}

export type SearchResult = ISearchItem[];
