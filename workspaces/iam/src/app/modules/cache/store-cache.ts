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
import { tap, catchError, map, last } from 'rxjs/operators';
import { Store, State as StoreState } from '@ngrx/store';
import {
  UpsertDocuments,
  DeleteDocuments,
  selectDocumentEntitiesState,
  AddDocument,
  UpdateDocument,
  DeleteDocument,
  SetCurrentDocumentId,
  selectCurrentDocumentIdState,
  DocumentEffectsDelete,
  SetSearchResultAction,
  selectDocumentsState
} from '../shared/state/document';
import { NEW_DOC_ID, DEFAULT_NEW_DOC_CONTENT } from '../shared/state/document/const';
import { SharedState } from '../shared/state/state';
import { StoreSearchService } from './services/store-search.service';

@Injectable()
export class StoreCache implements ICache {
  docMetaData: { hightKey: number; lowKey: number };

  public nextLevelCache: ICache;
  constructor(
    private store: Store<SharedState>,
    private state: StoreState<SharedState>,
    private _logger: Logger,
    private _storeSearchService: StoreSearchService
  ) {}

  init(nextLevelCache: ICache): ICache {
    this.nextLevelCache = nextLevelCache;
    return this;
  }

  createDoc(format: DocFormat) {
    const id = NEW_DOC_ID;
    const doc = new Document(id, undefined, new DocContent(id, DEFAULT_NEW_DOC_CONTENT, undefined));
    this.store.dispatch(new AddDocument({ collectionDocument: doc }));
    this.store.dispatch(new SetCurrentDocumentId({ id: id }));
  }

  CreateDocument(content: string, format: DocFormat) {
    return this.nextLevelCache.CreateDocument(content, format).pipe(
      tap(doc => {
        const id = selectCurrentDocumentIdState(this.state.value);
        if (id === NEW_DOC_ID) {
          this.store.dispatch(new DocumentEffectsDelete({ id }));
        }

        this.store.dispatch(
          new AddDocument({
            collectionDocument: doc
          })
        );
        this.store.dispatch(new SetCurrentDocumentId({ id: doc.id }));
      })
    );
  }

  readBulkDocMeta(key: number, isBelowTheKey = true) {
    return this.nextLevelCache.readBulkDocMeta(key, isBelowTheKey).pipe(
      tap(metaArray => {
        if (metaArray.length && metaArray[0] && metaArray[0].isDeleted) {
          this.store.dispatch(new DeleteDocuments({ ids: metaArray.map(m => m.id) }));
        } else {
          const array = new Array<Document>();
          metaArray.forEach(meta => {
            const docDic = selectDocumentEntitiesState(this.state.value);
            const doc = docDic[meta.id];

            if (doc && doc.metaData.updateDate.getTime() === meta.updateDate.getTime()) return;

            const content = doc && doc.content;
            array.push(new Document(meta.id, meta, content));
          });

          if (array.length)
            this.store.dispatch(
              new UpsertDocuments({
                collectionDocuments: array
              })
            );
        }
      })
    );
  }

  readDocMeta(key: number, checkNextCache?: boolean): Observable<DocMeta> {
    return this.nextLevelCache.readDocMeta(key, checkNextCache);
  }

  readDocContent(id: number, title: string, format: string): Observable<DocContent> {
    return this.nextLevelCache.readDocContent(id, title, format).pipe(
      tap(docContent => {
        // no data in next level, but the next level cache should further fetch from its next level. we would receive it.
        if (!docContent) return;

        if (docContent.isDeleted) {
          this.store.dispatch(new DeleteDocument({ id: docContent.id }));
        }

        const documents = selectDocumentEntitiesState(this.state.value);
        const document = documents[id];

        if (document && document.content && document.content.sha === docContent.sha) return; // nothing changed.

        this.nextLevelCache
          .readDocMeta(id)
          .pipe(
            tap(meta => {
              if (meta.contentSha !== docContent.sha) {
                this._logger.warn(
                  `metaData.contentSha:${meta.contentSha} is different with document sha: ${
                    docContent.sha
                  }, force using document sha`
                );
                meta.contentSha = docContent.sha;
              }
              if (!document) {
                const doc = new Document(id, meta, docContent);
                this.store.dispatch(new AddDocument({ collectionDocument: doc }));
              } else {
                this.store.dispatch(
                  new UpdateDocument({
                    collectionDocument: {
                      id: document.id,
                      changes: { metaData: meta, content: docContent }
                    }
                  })
                );
              }
            }),
            catchError(err => {
              throw err;
            })
          )
          .subscribe();
      })
    );
  }

  UpdateDocument(oldDocMeta: DocMeta, content: string, forceUpdate: boolean) {
    return this.nextLevelCache.UpdateDocument(oldDocMeta, content, forceUpdate).pipe(
      tap(doc =>
        this.store.dispatch(
          new UpdateDocument({
            collectionDocument: {
              id: oldDocMeta.id,
              changes: {
                content: doc.content,
                metaData: doc.metaData,
                documentStatus: doc.documentStatus
              }
            }
          })
        )
      )
    );
  }

  deleteDoc(id: number) {
    if (id === NEW_DOC_ID) {
      this.store.dispatch(new DeleteDocument({ id }));
      return of(id);
    }
    return this.nextLevelCache.deleteDoc(id).pipe<number>(
      tap(_ => {
        this.store.dispatch(new DeleteDocument({ id }));
      })
    );
  }

  search(query: string) {
    const docs = selectDocumentsState(this.state.value);
    const fromStoreCache$ = this._storeSearchService.search(docs, query);

    const fromNextCache$ = this.nextLevelCache
      .search(query)
      .pipe(tap(searchResult => this.store.dispatch(new SetSearchResultAction({ searchResult }))));

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
