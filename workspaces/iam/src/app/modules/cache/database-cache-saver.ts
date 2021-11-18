import { interval, asyncScheduler, zip, EMPTY, merge } from 'rxjs';
import { subscribeOn, catchError, switchMap, map, tap } from 'rxjs/operators';
import { ICache, DocContent, DataTables, DocMeta, Document, AUTO_SAVE_DIRTY_DOCS_IN_DB_INTERVAL } from 'core';
import { Database } from '../database/database-engine';
import { DirtyDocument } from '../core/model/doc-model/doc-status';
import { DocumentStore } from '../shared/store/document.store';

export class DatabaseCacheSaver {
  public autoSave$;

  constructor(
    private db: Database,
    private nextLevelCache: ICache,
    private store: DocumentStore
  ) {
    this.autoSave$ = interval(AUTO_SAVE_DIRTY_DOCS_IN_DB_INTERVAL).pipe(
      switchMap(() => this.db.getAll<DirtyDocument>(DataTables.DirtyDocs)),
      switchMap(ids => merge(...(ids.map(({id,changeLog}) => this.saveToNet(id, changeLog).pipe(
        tap((doc: Document) => {
          this.store.docMeta.upsert(doc.metaData);
          this.store.document.upsert(doc.content);
        })
      ))))),
      catchError(err => { console.error(err); return EMPTY; })
    )
  }

  public saveToDb(docMeta: DocMeta, docContent: DocContent, forceSave = false, changeLog: string) {
    return zip(
      this.db.put<DocContent>(DataTables.DocContent, docContent).pipe(
        subscribeOn(asyncScheduler),
        catchError(err => {
          console.error(err);
          throw err;
        })
      ),
      this.db.put<DocMeta>(DataTables.DocMeta, docMeta).pipe(
        subscribeOn(asyncScheduler),
        catchError(err => {
          console.error(err);
          throw err;
        })
      )
    ).pipe(
      map(([content, meta]) => {
        this.store.updateCurrentDocStatus({ isEditorDirty: false, isDbDirty: true });
        return new Document(docMeta, docContent);
      }),
      switchMap(doc => {
        const ro = this.db.put<DirtyDocument>(DataTables.DirtyDocs, new DirtyDocument(doc.metaData.id, changeLog));
        if (forceSave) {
          return ro.pipe(switchMap(r => this.saveToNet(doc.metaData.id, changeLog)));
        } else {
          return ro.pipe(map(r => doc));
        }
      })
    );
  }

  private saveToNet(id: number, changeLog: string) {
    return zip(
      this.db.get<DocContent>(DataTables.DocContent, id).pipe(
        subscribeOn(asyncScheduler),
        catchError(err => {
          console.error(err);
          throw err;
        })
      ),
      this.db.get<DocMeta>(DataTables.DocMeta, id).pipe(
        subscribeOn(asyncScheduler),
        catchError(err => {
          console.error(err);
          throw err;
        })
      )
    ).pipe(
      switchMap(([content, docMeta]) => {
        // saving to net
        this.store.updateCurrentDocStatus({ isSyncing: true });
        return this.nextLevelCache.updateDocument(docMeta, content, false, changeLog).pipe(
          switchMap(doc => {
            // saved to net
            this.store.updateCurrentDocStatus({ isDbDirty: false, isSyncing: false })
            return this.db.delete<DirtyDocument>(DataTables.DirtyDocs, id).pipe(
              map(r => doc)
            );
          })
        );
      })
    );
  }

}
