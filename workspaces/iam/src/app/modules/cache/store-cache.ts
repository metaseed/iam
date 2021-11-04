import {
  ICache,
  DocMeta,
  DocContent,
  Document,
  DocFormat,
  Logger,
  SearchResult,
  SearchResultSource
} from 'core';
import { Injectable } from '@angular/core';
import { Observable, of, merge } from 'rxjs';
import { tap, catchError, map, switchMap, filter } from 'rxjs/operators';
import { NEW_DOC_ID, DEFAULT_NEW_DOC_CONTENT } from '../shared/state/document/const';
import { StoreSearchService } from './services/store-search.service';
import { afterUpdateDoc } from './after-update-doc';
import { DocumentStore } from '../shared/store/document.store';

@Injectable({ providedIn: 'platform' })
export class StoreCache implements ICache {
  docMetaData: { hightKey: number; lowKey: number };

  public nextLevelCache: ICache;

  constructor(
    private _store: DocumentStore,
    private _logger: Logger,
    private _storeSearchService: StoreSearchService,
  ) { }

  init(nextLevelCache: ICache): ICache {
    this.nextLevelCache = nextLevelCache;
    return this;
  }

  /**
   * just creat draft doc, not create at next level cache
   * @param format
   */
  createDoc(format: DocFormat) {
    const id = NEW_DOC_ID;
    const doc = new Document(id, undefined, new DocContent(id, DEFAULT_NEW_DOC_CONTENT, undefined));

    this._store.add(doc);
    this._store.currentId_.next(id);
  }

  /**
   * would be called at user save
   */
  CreateDocument(content: string, format: DocFormat) {
    return this.nextLevelCache.CreateDocument(content, format).pipe(
      tap(doc => {
        this._store.add(doc);
        this._store.currentId_.next(doc.id);
      })
    );
  }

  readBulkDocMeta(id: number, isBelowTheKey = true) {
    return this.nextLevelCache.readBulkDocMeta(id, isBelowTheKey).pipe(
      tap(metaArray => {
        if (metaArray[0]?.isDeleted) {// grouped in next cache
          this._store.deleteMany(metaArray.map(m => m.id));
        } else {
          const array = new Array<Document>();
          metaArray.forEach(meta => {
            const doc = this._store.getDocument(meta.id);

            if (doc && doc.metaData.updateDate.getTime() === meta.updateDate.getTime()) return;

            const content = doc && doc.content;
            array.push(new Document(meta.id, meta, content));
          });

          if (array.length)
            this._store.upsertMany(array);
        }
      })
    );
  }

  readDocMeta(id: number, checkNextCache?: boolean): Observable<DocMeta> {
    return this.nextLevelCache.readDocMeta(id, checkNextCache).pipe(tap(meta => {
      if (meta.isDeleted) this._store.delete(meta.id);
      else {
        const metaInStore = this._store.getDocMeta(meta.id);
        if (!metaInStore) {
          this._store.add(new Document(meta.id, meta));
        } else if (metaInStore.updateDate.getTime() < meta.updateDate.getTime()) {
          this._store.update({
            id: meta.id,
            changes: { metaData: meta }
          });
        }
      }
    }));
  }

  readDocContent(id: number, title: string, format: string): Observable<DocContent> {
    return this.nextLevelCache.readDocContent(id, title, format).pipe(
      filter(docContent => {
        // no data in next level, but the next level cache should further fetch from its next level. we would receive it.
        if (!docContent) return false;

        if (docContent.isDeleted) {
          this._store.delete(docContent.id);
        }

        const document = this._store.getDocument(id);
        if (document?.content?.sha === docContent.sha)
          return false; // nothing changed.

        return true;
      }),
      tap(docContent =>
        this.nextLevelCache
          .readDocMeta(id)
          .pipe(
            tap(meta => {
              if (meta.contentSha !== docContent.sha) {
                this._logger.warn(
                  `metaData.contentSha:${meta.contentSha} is different with document sha: ${docContent.sha
                  }, force using document sha`
                );
                meta.contentSha = docContent.sha;
              }

              const document = this._store.getDocument(id);
              if (!document) {
                const doc = new Document(id, meta, docContent);
                this._store.add(doc);
              } else {
                this._store.update({
                  id: document.id,
                  changes: { metaData: meta, content: docContent }
                });
              }
            }),
            catchError(err => {
              throw err;
            })
          ).subscribe()
      )

    );
  }

  updateDocument(oldDocMeta: DocMeta, content: string, forceUpdate: boolean) {
    return this.nextLevelCache.updateDocument(oldDocMeta, content, forceUpdate).pipe(
      afterUpdateDoc(this._store)
    );
  }

  deleteDoc(id: number) {
    if (id === NEW_DOC_ID) {
      this._store.delete(id);
      return of(id);
    }
    return this.nextLevelCache.deleteDoc(id).pipe<number>(
      tap(_ => {
        this._store.delete(id);
      })
    );
  }

  search(query: string) {
    const docs = this._store.getAllDocuments();
    const fromStoreCache$ = this._storeSearchService.search(docs, query);

    const fromNextCache$ = this.nextLevelCache
      .search(query)
      .pipe(tap(searchResult => this._store.searchResult_.next(searchResult)));

    let lastResult: SearchResult;

    return merge(fromStoreCache$, fromNextCache$).pipe(
      map(searchResult => {
        if (!lastResult) {
          lastResult = [];
          searchResult.forEach(item => {
            lastResult.push(item);
          });
          return lastResult;
        }
        lastResult = [...lastResult];
        searchResult.forEach(item => {
          const index = lastResult.findIndex(it => it.id === item.id);

          if (index !== -1) {
            if (item.source !== SearchResultSource.store) {
              lastResult[index] = item;
            }
          } else {
            lastResult.push(item);
          }
        });
        return lastResult;
      })
    );
  }
}
