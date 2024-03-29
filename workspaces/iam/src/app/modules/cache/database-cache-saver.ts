import { interval, asyncScheduler, zip, merge, concat, timer } from 'rxjs';
import { subscribeOn, catchError, switchMap, map, tap, filter, retry, combineLatestWith, startWith, debounceTime } from 'rxjs/operators';
import { ICache, DocContent, DataTables, DocMeta, Document, AUTO_SAVE_DIRTY_DOCS_IN_DB_INTERVAL, Logger, backoff, AUTO_SAVE_TO_STORE_AFTER_LAST_EDIT_INTERVAL } from 'core';
import { Database } from '../database/database-engine';
import { DirtyDocument } from '../core/model/doc-model/doc-status';
import { DocumentStore } from '../shared/store/document.store';
import { fromEvent } from 'rxjs';

interface DocAndIamInstanceId {
  doc: Document;
  iamInstanceId: number;
}

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
      const docAndInstance: DocAndIamInstanceId = event.data;
      this.updateStore_AutoSaver(docAndInstance);

    }
    const online$ = fromEvent<boolean>(window, 'online').pipe(
      tap(status => this.logger.debug(`browser is online.`, status)),
      startWith(true),
      debounceTime(6000)
    )

    this.autoSave$ = interval(AUTO_SAVE_DIRTY_DOCS_IN_DB_INTERVAL + Math.random() * 10000) // random value used to give instances different db saving interval
      .pipe(
        combineLatestWith(online$),
        switchMap(() => this.db.getAll<DirtyDocument>(DataTables.DirtyDocs)),
        filter(docs => docs.length > 0),
        tap(dirtyDocs => this.logger.debug(`autoSaver: save dirty docs every ${AUTO_SAVE_DIRTY_DOCS_IN_DB_INTERVAL / 1000 / 60}min or network online again.`, dirtyDocs)),
        switchMap(dirtyDocs => concat(
          ...(dirtyDocs.map(({ id, changeLog, iamInstanceId }) => this.saveToNextCache(id, changeLog).pipe(
            tap((doc: Document) => {
              this.logger.info('autoSaver: broadcast doc saved to network', doc);
              // let other tab or window know
              this.broadcastChannel.postMessage({ doc, iamInstanceId });
              this.updateStore_AutoSaver({ doc, iamInstanceId });
            }),
            backoff(2, 2000),
          )))
        )),
        tap({ error: (err) => this.logger.error(err) }),
        retry()
      )
  }

  private updateStore_AutoSaver({ doc, iamInstanceId }: DocAndIamInstanceId) {
    this.logger.info('autoSaver: update doc in store after update the network doc!', doc);
    this.store.upsertDocStatus({ isDbDirty: false, isSyncing: false }, doc.metaData.id);
    // i'm the one who do the last db update.
    const lastDbSaverIsMe = iamInstanceId === this.store.iamInstanceId;
    this.updateStore(doc, lastDbSaverIsMe);
  }

  // |    |     |    | every 10s save to db
  // |                    | every 5min to net
  private updateStore(doc: Document, lastDbSaverOfDocIsMe) {
    this.store.docMeta.upsert(doc.metaData);

    // const isStoreDirty = this.store.currentDocStatus_IsStoreDirty$.state;

    if (lastDbSaverOfDocIsMe) {
      const updateContentFromStore = () => {
        const docContentInStore = this.store.getDocContent(doc.content.id);
        if (docContentInStore) {
          this.logger.info('autoSaver: last db saving triggered by me, and there is dirty content in store, just update none-content property, no need to update content string in store!', doc);
          doc.content.content = docContentInStore.content; this.store.docContent.upsert(doc.content);
          this.logger.info('autoSaver: update Doc in store!', doc);
        }
      }

      // wait for the dirty content in editor sync to store
      // const isEditorDirty = this.store.currentDocStatus_IsEditorDirty$.state;
      // if (isEditorDirty)
      //   timer(AUTO_SAVE_TO_STORE_AFTER_LAST_EDIT_INTERVAL + 10).subscribe(updateContentFromStore);
      // else {
        updateContentFromStore();
      // }
    } else {
      this.store.docContent.upsert(doc.content);
      this.logger.info('autoSaver: update Doc in store!', doc);
    }
  }

  private saveDocToDb(docMeta: DocMeta, docContent: DocContent) {
    return zip(
      this.db.put<DocContent>(DataTables.DocContent, docContent).pipe(
        catchError(err => {
          this.logger.error(err);
          throw err;
        })
      ),
      this.db.put<DocMeta>(DataTables.DocMeta, docMeta).pipe(
        catchError(err => {
          this.logger.error(err);
          throw err;
        })
      )
    )
  }

  public updateDocument(docMeta: DocMeta, docContent: DocContent, forceSave = false, changeLog: string) {
    return this.saveDocToDb(docMeta, docContent).pipe(
      map(([content, meta]) => {
        this.store.upsertDocStatus({ isStoreDirty: false, isDbDirty: true }, content.id);
        return new Document(docMeta, docContent);
      }),
      switchMap(doc => {
        const ro = this.db.put<DirtyDocument>(DataTables.DirtyDocs, new DirtyDocument(doc.metaData.id, changeLog, this.store.iamInstanceId));
        if (forceSave) {
          return ro.pipe(
            switchMap(r => this.saveToNextCache(doc.metaData.id, changeLog)),
            tap(doc => this.updateStore(doc, false))
          );
        } else {
          return ro.pipe(map(r => doc));
        }
      })
    );
  }

  private saveToNextCache(id: number, changeLog: string) {
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
