import { Inject, Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { SharedState, getDocumentByIdSelector, getDocumentsByIdsSelector } from 'shared';
import { map, switchMap, filter } from 'rxjs/operators';
import { DocMeta } from 'core';
import { EMPTY, Observable } from 'rxjs';
import { DocumentsEffects, DOCUMENT_EFFECTS_TOKEN } from 'app/modules/shared/store';

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

  constructor(private store: Store<SharedState>,
    @Inject(DOCUMENT_EFFECTS_TOKEN) private documentEffects: DocumentsEffects,
  ) {
  }

  initialData$(rootId: number) {
    const data$ = this.store.select(getDocumentByIdSelector(rootId))
      .pipe(filter(doc => !!doc),
        map(d => new DocNode(d.metaData)),
        switchMap(node => this.getChildren$(node).pipe(map(ns => { node.subPages = ns; return node }))),
      );
    this.documentEffects.readDocMetas_.next({ ids: [rootId] });
    return data$;
  }

  getChildren$(node: DocNode): Observable<DocNode[]> {
    if (!node.subPageIds?.length) {
      return EMPTY;
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
    this.documentEffects.readDocMetas_.next({ ids });

    return pageList$;
  }

}

