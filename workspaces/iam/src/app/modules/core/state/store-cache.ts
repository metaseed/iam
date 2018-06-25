import { DataTables, ICache, DocMeta } from '../model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseCache } from 'database';
import { tap } from 'rxjs/operators';
import { Store, State as StoreState } from '@ngrx/store';
import {
  State,
  UpsertDocuments,
  DeleteDocuments,
  selectDocumentEntitiesState
} from '../../home/state';

@Injectable()
export class StoreCache implements ICache {
  docMetaData: { hightKey: number; lowKey: number };

  constructor(
    public nextLevelCache: DatabaseCache,
    private store: Store<State>,
    private state: StoreState<State>
  ) {}

  readBulkDocMeta(key: number, isBelowTheKey = true): Observable<DocMeta[]> {
    return this.nextLevelCache.readBulkDocMeta(key, isBelowTheKey).pipe(
      tap(metaArray => {
        if (metaArray[0] && metaArray[0].isDeleted) {
          this.store.dispatch(new DeleteDocuments({ ids: metaArray.map(m => m.number) }));
        } else {
          this.store.dispatch(
            new UpsertDocuments({
              collectionDocuments: metaArray.map(meta => {
                const docDic = selectDocumentEntitiesState(this.state.value);
                const content = docDic[meta.number].content;
                return { number: meta.number, metaData: meta, content };
              })
            })
          );
        }
      })
    );
  }
}
