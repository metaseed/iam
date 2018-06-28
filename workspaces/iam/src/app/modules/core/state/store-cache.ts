import { DataTables, ICache, DocMeta, DocContent, Document } from '../model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseCache } from 'database';
import { tap, catchError } from 'rxjs/operators';
import { Store, State as StoreState } from '@ngrx/store';
import {
  State,
  UpsertDocuments,
  DeleteDocuments,
  selectDocumentEntitiesState,
  AddDocument,
  UpdateDocument,
  DeleteDocument
} from '../../home/state';

@Injectable()
export class StoreCache implements ICache {
  docMetaData: { hightKey: number; lowKey: number };

  public nextLevelCache: ICache;
  constructor(private store: Store<State>, private state: StoreState<State>) {}

  init(nextLevelCache: ICache): ICache {
    this.nextLevelCache = nextLevelCache;
    return this;
  }

  readBulkDocMeta(key: number, isBelowTheKey = true) {
    return this.nextLevelCache.readBulkDocMeta(key, isBelowTheKey).pipe(
      tap(metaArray => {
        if (metaArray[0] && metaArray[0].isDeleted) {
          this.store.dispatch(new DeleteDocuments({ ids: metaArray.map(m => m.key) }));
        } else {
          this.store.dispatch(
            new UpsertDocuments({
              collectionDocuments: metaArray.map(meta => {
                const docDic = selectDocumentEntitiesState(this.state.value);
                const content = docDic[meta.key] && docDic[meta.key].content;
                return new Document(meta.key, meta, content);
              })
            })
          );
        }
      })
    );
  }

  readDocMeta(key: number, checkNextCache?: boolean): Observable<DocMeta> {
    return this.nextLevelCache.readDocMeta(key, checkNextCache);
  }

  // todo: handle show from url.
  readDocContent(key: number, title: string, format: string): Observable<DocContent> {
    return this.nextLevelCache.readDocContent(key, title, format).pipe(
      tap(docContent => {
        // no data in next level, but the next level cache should further fetch from its next level. we would receive it.
        if (!docContent) return;
        if (docContent.isDeleted) {
          this.store.dispatch(new DeleteDocument({ id: docContent.key }));
        }

        const documents = selectDocumentEntitiesState(this.state.value);
        let document = documents[key];

        if (document && document.content.sha === docContent.sha) return; // nothing changed.

        this.nextLevelCache
          .readDocMeta(key)
          .pipe(
            tap(meta => {
              const doc = new Document(key, meta, docContent);
              if (!document) {
                this.store.dispatch(new AddDocument({ collectionDocument: doc }));
              } else {
                this.store.dispatch(
                  new UpdateDocument({
                    collectionDocument: { id: document.key, changes: doc }
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
}
