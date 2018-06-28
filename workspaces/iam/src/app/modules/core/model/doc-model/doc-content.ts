import { Content } from "net-storage";

export interface IDocContent extends Pick<Content, 'content' | 'sha'> {
  key: number;
  isDeleted:boolean;
}

export class DocContent implements IDocContent {
  constructor(public key:number,public content:string, public sha: string,public isDeleted = false ) {}
}
