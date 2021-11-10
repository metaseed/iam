import { Document, SearchResult } from "core";
import { EntityCacheStore, EntityChangeType, ID } from "@rx-store/entity";
import { state, StateSubject } from "@rx-store/core";
import { DocMemCacheService } from "app/modules/cache/services/mem-cache.service";
import { Injectable } from "@angular/core";
import { DocumentStatus } from "app/modules/core/model/doc-model/doc-status";
import { distinctUntilChanged, map } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class DocumentStore extends EntityCacheStore<number, Document> {
  constructor(cache: DocMemCacheService) {
    super(cache)
  }

  currentDocument$ = this.currentEntity$;

  // meta update would trigger this too
  currentDocContent$ = this.currentEntity$.map(doc => doc?.content);

  currentDocContentString$ = state(this.currentDocContent$.pipe(
    map(content => content?.content ?? ''),
    // meta update would trigger this too, so use distinctUntilChanged to filter out
    distinctUntilChanged())
  );

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

  document$ = this.entity$;

  docMeta$ = (id: number) => this.document$(id).pipe(map(d => d?.metaData));
  documents$ = this.entitiesOfIds$;
  docMetas$ = (ids: number[]) => this.documents$(ids).pipe(map(doc => doc.map(d => d?.metaData)));

  getAllDocuments() { return Object.values(this.cache.entities) }

  getDocument(id: number) {
    return this.cache.entities[id];
  }

  getDocMeta(id: number) {
    return this.getDocument(id)?.metaData;
  }

  getDocuments(ids: number[]) {
    return ids.map(id => this.cache.entities[id]);
  }

  getDocMetas(ids: number[]) {
    const docs = this.getDocuments(ids);
    return docs.map(doc => doc?.metaData);
  }

  updateCurrentDocStatus(status: Partial<DocumentStatus>) {
    const id = this.currentId_.state;
    const docStatus = this.currentDocStatus$.state;
    this.update({ id, changes: { documentStatus: { ...docStatus, ...status } } })
  }
}
