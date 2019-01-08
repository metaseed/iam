export interface ISearchItem {
  id: number;
  // 0-1;
  score: number;
  title: string;
  text_matches: [
    {
      fragment: string;
      matches: [{ text: string; indices: [number, number] }];
    }
  ];
}

export type SearchResult = ISearchItem[];
