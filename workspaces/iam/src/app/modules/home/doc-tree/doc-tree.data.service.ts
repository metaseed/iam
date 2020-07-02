import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { SharedState, getDocumentByIdSelector, DocumentEffectsReadDocMeta, getDocumentsByIdsSelector, DocumentEffectsReadDocMetas } from 'shared';
import { map, switchMap, filter } from 'rxjs/operators';
import { DocMeta } from 'core';
import { Observable, of } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

export class DocNode {
    id: number;
    title: string;
    summary: string;
    isLoading: boolean;
    subPages?: DocNode[];
    subPageIds: Array<string>;
    constructor(meta: DocMeta) {
        this.id = meta.id;
        this.title = meta.title;
        this.summary = meta.summary;
        this.subPageIds = meta.subPage;
    }
    get isExpandable() { return !!this.subPageIds?.length }
}

@Injectable({ providedIn: 'root' })
export class DocTreeDataService {

    constructor(private store: Store<SharedState>) {
    }

    get initialData$() {
        const data$ = this.store.select(getDocumentByIdSelector(1))
        .pipe(filter(doc => !!doc), map(d => new DocNode(d.metaData)), switchMap(node => this.getChildren$(node)));
        this.store.dispatch(new DocumentEffectsReadDocMeta({ id: 1 }));
        return data$;
    }

    getChildren$(node: DocNode): Observable<DocNode[] | undefined> {
        if (!node.subPageIds?.length) {
            return of(undefined);
        }
        const ids = node.subPageIds.map(p => +p);
        this.store.dispatch(new DocumentEffectsReadDocMetas({ ids }));
        const pageList$ = this.store.pipe(
            select(getDocumentsByIdsSelector(ids)),
            map(docs => [...docs
                .map(doc => doc?.metaData)
                .filter(m => !!m)
                .map(d => new DocNode(d))]
            ));
        return pageList$;
    }

}

