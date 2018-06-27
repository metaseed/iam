import { Content } from "net-storage";

export interface IDocContent extends Pick<Content, 'content' | 'sha'> {
  key: number;
}

export class DocContent implements IDocContent {
  constructor(public key:number,public content:string, public sha: string ) {}
}
