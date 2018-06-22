import { Content } from "net-storage";

export interface DocContent extends Pick<Content, 'content' | 'sha'> {
  number: number;
}
