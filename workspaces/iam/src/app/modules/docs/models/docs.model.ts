import { Document } from './document';

export class DocsModel {

    currentDoc: Document = null;
    constructor(public docs: Document[]) {

    }

}
