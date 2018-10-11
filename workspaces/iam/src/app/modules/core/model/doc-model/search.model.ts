export interface ISearchItem {
  id: number;
  score: number;
  title: string;
  text_matches: [{ fragment: string; matches: [{ text: string; indices: [number] }] }];
}
