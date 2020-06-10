import { interval, merge, asyncScheduler, zip, of } from 'rxjs';
import { tap, subscribeOn, catchError, switchMap, map } from 'rxjs/operators';
import { State, Store } from '@ngrx/store';
import { ICache, DocContent, DataTables, DocMeta, Document } from 'core';
import { Database } from '../database/database-engine';
import {
  DocumentStatus,
  DirtyDocuments as DirtyDocument
} from '../core/model/doc-model/doc-status';
import { DocumentStateFacade } from '../shared/state/document/document.facade';

export class DatabaseCacheSaver {
  schedule$ = interval(5 * 60 * 1000).pipe(
    tap(num => {
      this.handler();
    })
  );

  private docFacade: DocumentStateFacade;
  constructor(
    private db: Database,
    private nextLevelCache: ICache,
    private store: Store<any>,
    private state: State<any>
  ) {
    this.docFacade = new DocumentStateFacade(this.store, this.state);
  }

  public saveToDb(docMeta: DocMeta, content: string, forceSave = false) {
    const docContent = new DocContent(docMeta.id, content, docMeta.contentSha);
    return zip(
      this.db.put<DocContent>(DataTables.DocContent, docContent).pipe(
        subscribeOn(asyncScheduler),
        catchError(err => {
          throw err;
        })
      ),
      this.db.put<DocMeta>(DataTables.DocMeta, docMeta).pipe(
        subscribeOn(asyncScheduler),
        catchError(err => {
          throw err;
        })
      )
    ).pipe(
      map(([contentId, metaId]) => {
        let status = this.docFacade.getCurrentDocumentStatusState();
        return new Document(docMeta.id, docMeta, docContent, false, {
          ...status,
          isMemDirty: false,
          isDbDirty: true
        });
      }),
      switchMap(doc => {
        this.db.put<DirtyDocument>(DataTables.DirtyDocs, new DirtyDocument(doc.id));
        if (forceSave) {
          return this.saveToNet(doc.id);
        } else {
          return of(doc);
        }
      })
    );
  }

  private saveToNet(id: number) {
    return zip(
      this.db.get<DocContent>(DataTables.DocContent, id).pipe(
        subscribeOn(asyncScheduler),
        catchError(err => {
          throw err;
        })
      ),
      this.db.get<DocMeta>(DataTables.DocMeta, id).pipe(
        subscribeOn(asyncScheduler),
        catchError(err => {
          throw err;
        })
      )
    ).pipe(
      switchMap(([content, docMeta]) => {
        this.docFacade.modifyCurrentDocumentSavingToNetStatus();
        return this.nextLevelCache.UpdateDocument(docMeta, content.content, false).pipe(
          tap(doc => {
            this.docFacade.modifyCurrentDocumentDbSaveStatus();
            this.db.delete<DirtyDocument>(DataTables.DirtyDocs, id);
          })
        );
      })
    );
  }

  private handler() {
    this.db
      .getAllKeys<number[]>(DataTables.DirtyDocs)
      .pipe(
        tap(ids => {
          ids.forEach(id => {
            this.saveToNet(id).subscribe();
          });
        }),
        catchError(err => {
          throw err;
        })
      )
      .subscribe();
  }
}
