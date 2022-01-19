import {
  ICache,
  DocMeta,
  DocContent,
  Document,
  DocFormat,
  SearchResult,
  SearchResultSource,
  Logger,
  Tag
} from 'core';
import { Injectable } from '@angular/core';
import { Observable, of, merge, EMPTY } from 'rxjs';
import { tap, catchError, map, switchMap } from 'rxjs/operators';
import { NEW_DOC_ID, DEFAULT_NEW_DOC_CONTENT } from '../shared/store/const';
import { StoreSearchService } from './services/store-search.service';
import { DocumentStore } from '../shared/store/document.store';
import { concat } from 'rxjs';

@Injectable({ providedIn: 'platform' })
export class StoreCache implements ICache {
  docMetaData: { hightKey: number; lowKey: number };

  public nextLevelCache: ICache;
  private logger = Logger('StoreCache');

  constructor(
    private _store: DocumentStore,
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

    this._store.docContent.add(doc);
    this._store.currentId_.next(id);
  }

  /**
   * would be called at user save
   */
  CreateDocument(content: string, format: DocFormat) {
    return this.nextLevelCache.CreateDocument(content, format).pipe(
      tap(doc => {
        const id = doc.metaData.id;
        this._store.docContent.add(doc.content);
        this._store.docMeta.add(doc.metaData);
        this._store.upsertDocStatus({ isEditable: true }, id);
        this._store.currentId_.next(id);
        this._store.docContent.delete(NEW_DOC_ID);
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
        {
          this.logger.debug(`readDocMeta: delete document from store because it's meta data means deleted in remote`)
          this._store.delete(meta.id);
        }
        else {
          const metaInStore = this._store.getDocMeta(meta.id);
          if (!metaInStore) {
            this.logger.debug(`readDocMeta: add doc meta(${meta.id}) to store`, meta);
            this._store.docMeta.add(meta);
          } else if (metaInStore.updateDate.getTime() < meta.updateDate.getTime()) {
            this.logger.debug(`readDocMeta: update doc meta(${meta.id}) to store`, meta);
            this._store.docMeta.update({
              id: meta.id,
              changes: meta
            });
          }
          else {
            this.logger.debug(`readDocMeta: meta(${meta.id}) in store is the same as far-cache. no process for it in store`, meta)
          }
        }
      })
    );
  }

  readDocContent(id: number, format: string): Observable<DocContent> {
    const updateContentTags = (tags: string[], store: DocumentStore, id: number) => {
      if (tags && tags.length > 0) {
        const tagContent = `tag: [${tags.map(t => t.trim()).join(',')}]`;
        const docContent = store.getDocContent(id);
        const docContentString = docContent.content;
        if (docContentString) {
          const regex = /(?<=\n---.*\n)tag:\s*\[\s*.*?\s*\](?=\s*\n.*\n---)/s;
          const r = regex.exec(docContentString);
          if (r) {
            const content = r[0];
            if (content !== tagContent) {
              const newContent = docContentString.replace(regex, tagContent);
              this.logger.debug(`readDocContent.updateContentTags: update doc content with tags from docMeta`, content, tagContent)
              docContent.content = newContent;
              this._store.docContent.update({
                id,
                changes: docContent
              });
            }
          }
        }

      }
    }
    return this.nextLevelCache.readDocContent(id, format).pipe(
      switchMap(docContent => {
        // no data in next level, but the next level cache should further fetch from its next level. we would receive it.
        // actually this code would never executed. because far-cache only return none empty item.
        if (!docContent) {
          this.logger.warn(`readDocContent: doc(id: ${id}) content from far-cache is empty`)
          return EMPTY;
        }

        if (docContent.isDeleted) {
          this.logger.warn(`readDocContent: id: ${id} is deleted from far-cache, so delete is from store`)
          this._store.delete(docContent.id); // delete dotContent, meta and status.
          return EMPTY;
        }

        // update it in store
        const docContentInStore = this._store.getDocContent(id);
        if (docContentInStore?.sha === docContent.sha) {
          this.logger.debug(`readDocContent:  received docContent id(${id}) from far-cache, but content sha in mem is the same with the sha from next cache, so no need to update it in store.`)
          return EMPTY; // nothing changed.
        }

        if (!docContentInStore) {
          this.logger.debug(`readDocContent: received docContent id(${id}) from far-cache, add content to store.`, docContent)
          this._store.docContent.add(docContent);
        } else {
          this.logger.debug(`readDocContent: received docContent id(${id}) from far-cache, update content to store.`, docContent)

          this._store.docContent.update({
            id: docContentInStore.id,
            changes: docContent
          });
        }

        // why need to read docMeta?
        // because: when save docContent, we need to update docMeta
        // docMeta can has additional content not from docContent.
        // we need to merge oldMeta with new content from docContent
        return this
          .readDocMeta(id)
          .pipe(
            tap(meta => {
              updateContentTags(meta.tag, this._store, id);
            }),
            catchError(err => {
              throw err;
            }),
            map(meta => docContent)
          )
      })
    );

  }

  updateDocument(oldDocMeta: DocMeta, content: DocContent, forceUpdate: boolean, changeLog: string) {
    this._store.docContent.upsert(content);
    this.logger.log(`doc content string with id(${oldDocMeta.id}) Saved to store!`);

    return this.nextLevelCache.updateDocument(oldDocMeta, content, forceUpdate, changeLog);
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
    const docs = this._store.getAllDocMetaContent();

    const fromStoreCache$ = this._storeSearchService.search(docs, query);

    const fromNextCache$ = this.nextLevelCache.search(query)

    let lastResult: SearchResult;

    return concat(fromStoreCache$, fromNextCache$).pipe(
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
              item.title ??= lastResult[index].title;
              // lastResult[index] = item;
              lastResult.splice(index,0, item);
            }
          } else {
            lastResult.push(item);
          }

          if (!item.title) {
            this._store.docMeta.getById(item.id).then(
              it => {
                if (it?.title)
                  item.title = it.title
              }
            )
          }
        });
        return lastResult;
      }),
      tap(searchResult => this._store.searchResult_.next(searchResult))
    );
  }
}
