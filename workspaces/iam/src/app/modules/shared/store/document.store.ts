import { Document, SearchResult } from "core";
import { EntityCacheStore } from "@rx-store/entity";
import { StateSubject } from "@rx-store/core";
import { DocMemCacheService } from "app/modules/cache/services/mem-cache.service";
import { Injectable } from "@angular/core";
import { DocumentStatus } from "app/modules/core/model/doc-model/doc-status";

@Injectable({ providedIn: 'root' })
export class DocumentStore extends EntityCacheStore<number,Document> {
  constructor(cache: DocMemCacheService) {
    super(cache)
  }

  get documents() { return Object.values(this.cache.entities) }

  currentDocument$ = this.currentEntity$;

  currentDocContent$ = this.currentEntity$.map(doc => doc?.content);

  currentDocContentString$ = this.currentDocContent$.map(content => content?.content ?? '');

  currentDocStatus$ = this.currentEntity$.map(doc => doc?.documentStatus);

  currentDocStatus_IsEditorDirty$ = this.currentDocStatus$.map(status => status?.isEditorDirty);

  currentDocStatus_IsDbDirty$ = this.currentDocStatus$.map(status => status?.isDbDirty);

  currentDocStatus_IsSyncing$ = this.currentDocStatus$.map(status => status?.isSyncing);

  /**
   *  undefined:initial; Number.MAX_VALUE highest number: no newest
   */
  idRangHigh_ = new StateSubject<number>();

  /**
   * undefined: lowest number, no oldest
   */
  idRangeLow_ = new StateSubject<number>();

  searchResult_ = new StateSubject<SearchResult>();

  getDocument(id: number) {
    return this.getById(id).state;
  }

  getDocMeta(id: number) {
    return this.getDocument(id)?.metaData;
  }

  getDocMetas(ids: number[]) {
    const docs = this.getMany(ids).state;
    return docs.map(doc => doc?.metaData);
  }

  updateCurrentDocStatus( status: Partial<DocumentStatus>){
    const id = this.currentId_.state;
    const docStatus = this.currentDocStatus$.state;
    this.update({ id, changes: { documentStatus: { ...docStatus, ...status} } })
  }
}
