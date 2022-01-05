import { interval, asyncScheduler, zip, merge } from 'rxjs';
import { subscribeOn, catchError, switchMap, map, tap, filter, retry, combineLatestWith, startWith, debounceTime } from 'rxjs/operators';
import { ICache, DocContent, DataTables, DocMeta, Document, AUTO_SAVE_DIRTY_DOCS_IN_DB_INTERVAL, Logger, backoff } from 'core';
import { Database } from '../database/database-engine';
import { DirtyDocument } from '../core/model/doc-model/doc-status';
import { DocumentStore } from '../shared/store/document.store';
import { fromEvent } from 'rxjs';

export class DatabaseCacheSaver {
  public autoSave$;
  private logger = Logger(this.constructor.name);
  private broadcastChannel = new BroadcastChannel(`iam-${location.origin}`);

  constructor(
    private db: Database,
    private nextLevelCache: ICache,
    private store: DocumentStore
  ) {
    // when auto saved to net in another window or tab.
    this.broadcastChannel.onmessage = (event) => {
      this.logger.info(`IndexedDBBroadcastChannel: received dirty doc saved event:`, event.data);
      const doc: Document = event.data;
      this.updateStore_AutoSaver(doc);

    }
    const online$ = fromEvent<boolean>(window, 'online').pipe(
      tap(status => this.logger.debug(`browser is online.`, status)),
      startWith(true),
      debounceTime(6000)
    )

    this.autoSave$ = interval(AUTO_SAVE_DIRTY_DOCS_IN_DB_INTERVAL + Math.random() * 10000).pipe(
      combineLatestWith(online$),
      switchMap(() => this.db.getAll<DirtyDocument>(DataTables.DirtyDocs)),
      filter(docs => docs.length > 0),
      tap(dirtyDocs => this.logger.debug(`autoSaver: save dirty docs every ${AUTO_SAVE_DIRTY_DOCS_IN_DB_INTERVAL / 1000 / 60}min or network online again.`, dirtyDocs)),
      switchMap(ids => merge(...(ids.map(({ id, changeLog }) => this.saveToNet(id, changeLog).pipe(
        tap((doc: Document) => {
          this.logger.info('autoSaver: broadcast doc saved to network');
          // let other tab or window know
          this.broadcastChannel.postMessage(doc);
          this.updateStore_AutoSaver(doc);
        }),
        backoff(2, 2000),
      ))))),
      tap({ error: (err) => this.logger.error(err) }),
      retry()
    )
  }
  private updateStore_AutoSaver(doc: Document) {
    this.logger.info('autoSaver: update doc in store after update the network doc!');
    this.store.upsertDocStatus({ isDbDirty: false, isSyncing: false }, doc.metaData.id);
    this.updateStore(doc);
  }
  private updateStore(doc: Document) {
    this.store.docMeta.upsert(doc.metaData);
    this.store.docContent.upsert(doc.content);
  }

  private saveDocToDb(docMeta: DocMeta, docContent: DocContent) {
    return zip(
      this.db.put<DocContent>(DataTables.DocContent, docContent).pipe(
        subscribeOn(asyncScheduler),
        catchError(err => {
          this.logger.error(err);
          throw err;
        })
      ),
      this.db.put<DocMeta>(DataTables.DocMeta, docMeta).pipe(
        subscribeOn(asyncScheduler),
        catchError(err => {
          this.logger.error(err);
          throw err;
        })
      )
    )
  }
  public saveToDb(docMeta: DocMeta, docContent: DocContent, forceSave = false, changeLog: string) {
    return this.saveDocToDb(docMeta, docContent).pipe(
      map(([content, meta]) => {
        this.store.upsertDocStatus({ isEditorDirty: false, isDbDirty: true }, content.id);
        return new Document(docMeta, docContent);
      }),
      switchMap(doc => {
        const ro = this.db.put<DirtyDocument>(DataTables.DirtyDocs, new DirtyDocument(doc.metaData.id, changeLog));
        if (forceSave) {
          return ro.pipe(
            switchMap(r => this.saveToNet(doc.metaData.id, changeLog)),
            tap(doc => this.updateStore(doc))
          );
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
          this.logger.error(err);
          throw err;
        })
      ),
      this.db.get<DocMeta>(DataTables.DocMeta, id).pipe(
        subscribeOn(asyncScheduler),
        catchError(err => {
          this.logger.error(err);
          throw err;
        })
      )
    ).pipe(
      switchMap(([content, docMeta]) => {
        // saving to net
        this.store.upsertDocStatus({ isSyncing: true }, id);
        return this.nextLevelCache.updateDocument(docMeta, content, false, changeLog).pipe(
          switchMap(doc => {
            // saved to net
            this.store.upsertDocStatus({ isDbDirty: false, isSyncing: false }, id)
            return this.db.delete<DirtyDocument>(DataTables.DirtyDocs, id).pipe(
              tap(() => this.saveDocToDb(doc.metaData, doc.content)),
              map(r => doc)
            );
          })
        );
      })
    );
  }

}
