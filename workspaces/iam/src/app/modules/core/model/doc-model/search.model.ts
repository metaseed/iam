export interface ITextMatch {
  fragment: string;
  matches: [{ text: string; indices: [number, number] }];
}

export enum SearchResultSource {
  store='store',
  indexdb='localDb',
  netFile='netFile',
  netIssue='netSummary'
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
