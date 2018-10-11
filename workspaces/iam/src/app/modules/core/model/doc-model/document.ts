import { DocMeta } from './doc-meta';
import { Issue, Content } from 'net-storage';
import { DocContent } from './doc-content';

export interface IDocument {
  id: number;
  metaData: DocMeta;
  content?: DocContent;
}

export interface IDocmentTempState {
  isUpdateMeta: boolean;
}

export enum DocFormat {
  md = 'md'
}

export class Document implements IDocument, IDocmentTempState {
  constructor(
    public id: number,
    public metaData: DocMeta,
    public content: DocContent,
    public isUpdateMeta = false
  ) {}
}
