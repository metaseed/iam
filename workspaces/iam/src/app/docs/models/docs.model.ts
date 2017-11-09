import { Document } from './document';
export class DocsModel {
    currentDoc: Document;
    constructor(public docs: Document[]) { }
}