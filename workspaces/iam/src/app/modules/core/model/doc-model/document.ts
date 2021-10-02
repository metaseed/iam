import { DocMeta } from './doc-meta';
import { Issue, Content } from 'net-storage';
import { DocContent } from './doc-content';
import { DocumentStatus } from './doc-status';

export interface IDocument {
  id: number;
  metaData: DocMeta;
  content?: DocContent;
}

export interface IDocumentTempState {
  isUpdateMeta: boolean;
}

export enum DocFormat {
  md = 'md'
}

export class Document implements IDocument, IDocumentTempState {
  constructor(
    public id: number,
    public metaData: DocMeta,
    public content: DocContent,
    public isUpdateMeta = false,
    public documentStatus = new DocumentStatus(id)
  ) {}
}
