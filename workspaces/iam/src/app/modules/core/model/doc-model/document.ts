import { DocMeta } from './doc-meta';
import { DocContent } from './doc-content';
import { DocumentStatus } from './doc-status';

export interface IDocument {
  id: number;
  metaData: DocMeta;
  content?: DocContent;
}

export interface IDocumentTempState {
}

export enum DocFormat {
  md = 'md'
}

export class Document implements IDocument, IDocumentTempState {
  constructor(
    public id: number,
    public metaData: DocMeta,
    public content?: DocContent,
    public documentStatus = new DocumentStatus(id)
  ) {}
}
