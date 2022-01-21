import { DocMeta } from './doc-meta';
import { DocContent } from './doc-content';

export interface IDocument {
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
    public metaData: DocMeta,
    public content?: DocContent
  ) {
  }
}
