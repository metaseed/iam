import { DataTables, ICache, DocMeta, DocContent, Document } from '../model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseCache } from 'database';
import { tap } from 'rxjs/operators';
import { Store, State as StoreState } from '@ngrx/store';
import {
  State,
  UpsertDocuments,
  DeleteDocuments,
  selectDocumentEntitiesState,
  AddDocument,
  UpdateDocument
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
                return { number: meta.key, metaData: meta, content };
              })
            })
          );
        }
      })
    );
  }


  // todo: handle show from url.
  readDocContent(key: number, title: string, format: string): Observable<DocContent> {
    return this.nextLevelCache.readDocContent(key, title, format).pipe(
      tap(docContent => {
        const documents = selectDocumentEntitiesState(this.state.value);
        let document = documents[key];
        let curDoc = document ? { ...document } : <Document>{ number: key };//todo: doc meta is null
        curDoc.content = docContent;
        if (!document) {
          this.store.dispatch(new AddDocument({ collectionDocument: <any>curDoc }));
        } else {
          this.store.dispatch(
            new UpdateDocument({
              collectionDocument: { id: curDoc.number, changes: <any>curDoc }
            })
          );
        }
      })
    );
  }
}
