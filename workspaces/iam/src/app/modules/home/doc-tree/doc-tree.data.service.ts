import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { SharedState, getDocumentByIdSelector, DocumentEffectsReadDocMeta, getDocumentsByIdsSelector, DocumentEffectsReadDocMetas } from 'shared';
import { map, switchMap, filter, tap } from 'rxjs/operators';
import { DocMeta } from 'core';
import { Observable, of } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

export class DocNode {
    id: number;
    title: string;
    summary: string;
    isLoading: boolean;
    parent: DocNode;
    subPages: DocNode[];
    subPageIds: Array<string>;
    format: string
    constructor(meta: DocMeta) {
        this.id = meta.id;
        this.title = meta.title;
        this.summary = meta.summary;
        this.subPageIds = meta.subPage;
        this.format = meta.format;
    }

}

@Injectable({ providedIn: 'root' })
export class DocTreeDataService {

    constructor(private store: Store<SharedState>) {
    }

    get initialData$() {
        const data$ = this.store.select(getDocumentByIdSelector(1))
            .pipe(filter(doc => !!doc),
                map(d => new DocNode(d.metaData)),
                switchMap(node => this.getChildren$(node).pipe(map(ns => {node.subPages = ns; return node}))),
            );
        this.store.dispatch(new DocumentEffectsReadDocMeta({ id: 1 }));
        return data$;
    }

    getChildren$(node: DocNode): Observable<DocNode[] | undefined> {
        if (!node.subPageIds?.length) {
            return of(undefined);
        }
        const ids = node.subPageIds.map(p => +p);
        const pageList$ = this.store.pipe(
            select(getDocumentsByIdsSelector(ids)),
            map(docs => [...docs
                .map(doc => doc?.metaData)
                .filter(m => !!m)
                .map(d => { const r = new DocNode(d); r.parent = node; return r; })
            ]
            ),
            filter(docs => !!docs?.length));
        this.store.dispatch(new DocumentEffectsReadDocMetas({ ids }));
        return pageList$;
    }

}

