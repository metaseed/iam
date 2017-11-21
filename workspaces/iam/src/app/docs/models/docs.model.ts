import { Document } from './document';
import { Url } from 'url';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/bindCallback';

export class DocsModel {
    currentDoc: Document;//need to be removed

    constructor(public docs: Document[]) {

    }

}
