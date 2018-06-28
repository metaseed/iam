import { Content } from "net-storage";

export interface IDocContent extends Pick<Content, 'content' | 'sha'> {
  id: number;
  isDeleted:boolean;
}

export class DocContent implements IDocContent {
  constructor(public id:number,public content:string, public sha: string,public isDeleted = false ) {}
}
