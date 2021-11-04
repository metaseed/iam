import { Document } from "core";
import { EntityCacheStore, EntityCacheService } from "@rx-store/entity";
import { StateSubject } from "@rx-store/core";

export class DocumentStore extends EntityCacheStore<Document> {
  constructor(cache: EntityCacheService<Document>) {
    super(cache)
  }
  currentDocContent$ = this.currentEntity$.map(doc => doc?.content);

  currentDocContentString$ = this.currentDocContent$.map(content => content?.content ?? '');

  currentDocStatus$ = this.currentEntity$.map(doc => doc?.documentStatus);

  currentDocStatus_IsEditorDirty$ = this.currentDocStatus$.map(status => status?.isEditorDirty);

  currentDocStatus_IsDbDirty$ = this.currentDocStatus$.map(status => status?.isDbDirty);

  currentDocStatus_IsSyncing$ = this.currentDocStatus$.map(status => status.isSyncing);

  /**
   *  undefined:initial; Number.MAX_VALUE highest number: no newest
   */
  idRangHigh_ = new StateSubject<number>();

  /**
   * undefined: lowest number, no oldest
   */
  idRangeLow_ = new StateSubject<number>();

  searchResult_ = new StateSubject<string>();

  getDocuments(ids: number[]) {
    return ids.map(id => this.cache.entities[id])
  }

  getDocMetas(ids: number[]) {
    const docs = this.getDocuments(ids);
    return docs.map(doc => doc?.metaData);
  }
}
