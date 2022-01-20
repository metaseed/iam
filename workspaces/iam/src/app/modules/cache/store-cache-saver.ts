import { concat, filter, interval, of, retry, switchMap, tap } from "rxjs";
import { AUTO_SAVE_TO_DB_AFTER_LAST_EDIT_INTERVAL, DocContent, DocMeta, ICache } from "../core/model";
import { DirtyDocumentInStore } from "../core/model/doc-model/doc-status";
import { backoff } from "../core/operators";
import { Logger } from "../core/services";
import { DocumentStore } from "../shared/store/document.store";
import { Document } from 'core';

export class StoreSaver {
  private logger = Logger(this.constructor.name);

  constructor(
    private store: DocumentStore,
    private nextLevelCache: ICache
  ) { }

  public autoSave$ = interval(AUTO_SAVE_TO_DB_AFTER_LAST_EDIT_INTERVAL)
    .pipe(
      switchMap(() => this.store.dirtyDoc.getAll()),
      filter(docs => docs.length > 0),
      tap(dirtyDocs => this.logger.debug(`autoSaver: save dirty docs every ${AUTO_SAVE_TO_DB_AFTER_LAST_EDIT_INTERVAL / 1000} seconds.`, dirtyDocs)),
      switchMap(dirtyDocs => concat(
        ...(dirtyDocs.map(
          ({ id, changeLog }) => this.saveToNextCache(id, changeLog)
        ))
      )),
      tap({ error: (err) => this.logger.error(err) }),
      retry()
    );

  public updateDocument(docMeta: DocMeta, docContent: DocContent, forceSave: boolean, changeLog: string) {
    this.store.docContent.upsert(docContent);
    this.logger.log(`doc content string with id(${docMeta.id}) Saved to store!`);
    this.store.upsertDocStatus({ isStoreDirty: true }, docContent.id);

    if (forceSave) {
      return this.nextLevelCache.updateDocument(docMeta, docContent, forceSave, changeLog).pipe(
        tap(() => {
          // isStoreDirty is updated in next cache after saved to indexdb
          // this.store.upsertDocStatus({ isStoreDirty: false }, docContent.id);
        })
      );
    }

    this.store.dirtyDoc.upsert(new DirtyDocumentInStore(docMeta.id, changeLog));
    return of(new Document(docMeta, docContent));
  }

  private saveToNextCache(id: number, changeLog: string) {
    const docMeta = this.store.getDocMeta(id);
    const content = this.store.getDocContent(id);
    return this.nextLevelCache.updateDocument(docMeta, content, false, changeLog).pipe(
      tap(doc => {
        this.logger.info('autoSaver: save doc saved to indexDB', doc);
        this.store.dirtyDoc.delete(doc.metaData.id);
        // isStoreDirty is updated in next cache after saved to indexdb
        // this.store.upsertDocStatus({ isStoreDirty: false }, content.id);

      }),
      backoff(2, 2000),
    );
  }
}
