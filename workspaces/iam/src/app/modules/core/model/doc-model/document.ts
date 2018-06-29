import { DocMeta } from "./doc-meta";
import { Issue,Content } from 'net-storage';
import { DocContent } from "./doc-content";

export interface IDocument {
  id:number;
  metaData: DocMeta;
  content?: DocContent;
}

export enum DocFormat {
  md='md'
}

export class Document implements IDocument {
  constructor(public id:number,public metaData:DocMeta,public content:DocContent){}
}
