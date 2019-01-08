export interface ITextMatche {
  fragment: string;
  matches: [{ text: string; indices: [number, number] }];
}
export interface ISearchItem {
  id: number;
  // 0-1;
  score: number;
  title: string;
  text_matches: ITextMatche[];
}

export type SearchResult = ISearchItem[];
