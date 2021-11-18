import {
  ICache,
  DocMeta,
  DocContent,
  Document,
  DocFormat,
  LogService,
  SearchResult,
  SearchResultSource
} from 'core';
import { Injectable } from '@angular/core';
import { Observable, of, merge } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { NEW_DOC_ID, DEFAULT_NEW_DOC_CONTENT } from '../shared/store/const';
import { StoreSearchService } from './services/store-search.service';
import { DocumentStore } from '../shared/store/document.store';

@Injectable({ providedIn: 'platform' })
export class StoreCache implements ICache {
  docMetaData: { hightKey: number; lowKey: number };

  public nextLevelCache: ICache;

  constructor(
    private _store: DocumentStore,
    private _logger: LogService,
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
    const doc = new DocContent(id, DEFAULT_NEW_DOC_CONTENT, undefined);

    this._store.document.add(doc);
    this._store.currentId_.next(id);
  }

  /**
   * would be called at user save
   */
  CreateDocument(content: string, format: DocFormat) {
    return this.nextLevelCache.CreateDocument(content, format).pipe(
      tap(doc => {
        this._store.document.add(doc.content);
        this._store.docMeta.add(doc.metaData);
        this._store.currentId_.next(doc.metaData.id);
      })
    );
  }

  readBulkDocMeta(id: number, isBelowTheKey = true) {
    return this.nextLevelCache.readBulkDocMeta(id, isBelowTheKey).pipe(
      tap(metaArray => {
        if (metaArray[0]?.isDeleted) {// grouped in next cache
          this._store.deleteMany(metaArray.map(m => m.id));
        } else {
          const array = [];
          metaArray.forEach(meta => {
            const docMeta = this._store.getDocMeta(meta.id)
            if (docMeta && docMeta.updateDate.getTime() === meta.updateDate.getTime()) return;

            array.push(meta);
          });

          if (array.length)
            this._store.docMeta.upsertMany(array);
        }
      })
    );
  }

  readDocMeta(id: number, checkNextCache?: boolean): Observable<DocMeta> {
    return this.nextLevelCache.readDocMeta(id, checkNextCache).pipe(
      tap(meta => {
        if (meta.isDeleted)
          this._store.delete(meta.id);
        else {
          const metaInStore = this._store.getDocMeta(meta.id);
          if (!metaInStore) {
            console.debug(`@storeCache.readDocMeta: add doc meta to store`, meta);
            this._store.docMeta.add(meta);
          } else if (metaInStore.updateDate.getTime() < meta.updateDate.getTime()) {
            console.debug(`@storeCache.readDocMeta: update doc meta to store`, meta);
            this._store.docMeta.update({
              id: meta.id,
              changes: meta
            });
          }
          else {
              console.debug(`@storeCache.readDocMeta: meta in store is the same as far-cache. no process for it in store`, meta)
          }
        }
      })
    );
  }

  readDocContent(id: number, format: string): Observable<DocContent> {
    return this.nextLevelCache.readDocContent(id, format).pipe(
      tap(docContent => {
        // no data in next level, but the next level cache should further fetch from its next level. we would receive it.
        // actually this code would never executed. because far-cache only return none empty item.
        if (!docContent) {
          console.warn(`@storeCache.readDocContent: doc(id: ${id}) content from far-cache is empty`)
          return;
        }

        if (docContent.isDeleted) {
          console.warn(`@storeCache.readDocContent: id: ${id} is deleted from far-cache, so delete is from store`)
          this._store.delete(docContent.id); // delete dotContent, meta and status.
          return;
        }

        // update it in store
        const document = this._store.getDocument(id);
        if (document?.sha === docContent.sha) {
          console.debug(`@storeCache.readDocContent: id: ${id}, content sha in mem is the same with the sha from next cache, so no need to update it in store.`)
          return; // nothing changed.
        }

        this.nextLevelCache
          // why need to read docMeta?
          .readDocMeta(id)
          .pipe(
            tap(meta => {
              const document = this._store.getDocument(id);
              if (!document) {
                console.debug(`@storeCache.readDocContent: received id(${id}) from far-cache, add dotMeta and content to store.`, meta, docContent)
                this._store.docMeta.add(meta);
                this._store.document.add(docContent);
              } else {
                console.debug(`@storeCache.readDocContent: received id(${id}) from far-cache, update dotMeta and content to store.`, meta, docContent)

                this._store.docMeta.update({
                  id: document.id,
                  changes: meta
                });
                this._store.document.update({
                  id: document.id,
                  changes: docContent
                });
              }
            }),
            catchError(err => {
              throw err;
            })
          ).subscribe()
      })

    );
  }

  updateDocument(oldDocMeta: DocMeta, content: DocContent, forceUpdate: boolean, changeLog: string) {
    return this.nextLevelCache.updateDocument(oldDocMeta, content, forceUpdate, changeLog).pipe(
      tap((doc: Document) => {
        this._store.docMeta.upsert(doc.metaData);
        this._store.document.upsert(doc.content);
      })
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
