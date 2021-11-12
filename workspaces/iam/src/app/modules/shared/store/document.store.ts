import { DocContent, DocMeta, SearchResult } from "core";
import { EntityCacheStore, MemEntityCache } from "@rx-store/entity";
import { state, StateSubject } from "@rx-store/core";
import { Injectable } from "@angular/core";
import { DocumentStatus } from "app/modules/core/model/doc-model/doc-status";
import { distinctUntilChanged, map, tap } from "rxjs/operators";
import { pipe } from "rxjs";

@Injectable({ providedIn: 'root' })
export class DocumentStore {

  docMeta = new EntityCacheStore<number, DocMeta>(new MemEntityCache({
    idGenerator: e => e.id,
    sortComparer: (a: DocMeta, b: DocMeta) =>
      a.updateDate.getTime() < b.updateDate.getTime()
        ? 1 // switch
        : -1
  }));

  document = new EntityCacheStore<number, DocContent>(new MemEntityCache({ idGenerator: e => e.id }));

  docStatus = new EntityCacheStore<number, DocumentStatus>(new MemEntityCache({ idGenerator: e => e.id }));

  currentId_ = new StateSubject<number>().addEffect(pipe(
    tap((id: number) => {
      this.docMeta.currentId_.next(id);
      this.document.currentId_.next(id);
      this.docStatus.currentId_.next(id);
    })
  ));

  currentDocMeta$ = this.docMeta.currentEntity$;

  currentDocContent$ = this.document.currentEntity$;

  currentDocStatus$ = this.docStatus.currentEntity$;

  currentDocContentString$ = state(this.currentDocContent$.pipe(
    map(content => content?.content ?? ''),
    // todo: remove distinctUntilChanged
    //old: meta update would trigger this too, so use distinctUntilChanged to filter out
    distinctUntilChanged())
  );

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

  document$ = this.document.entity$;

  docMeta$ = this.docMeta.entity$;

  docMetas$ = this.docMeta.entitiesOfIds$

  getAllDocuments() { return Object.values(this.document.cache.entities) }
  getAllDocMetas() { return Object.values(this.docMeta.cache.entities) }

  getDocument(id: number) {
    return this.document.cache.entities[id];
  }

  getDocMeta(id: number) {
    return this.docMeta.cache.entities[id];
  }

  getDocuments(ids: number[]) {
    return ids.map(id => this.document.cache.entities[id]);
  }

  getDocMetas(ids: number[]) {
    return ids.map(id => this.docMeta.cache.entities[id]);
  }

  updateCurrentDocStatus(status: Partial<DocumentStatus>) {
    this.docStatus.update({
      id: this.currentId_.state,
      changes: status
    })
  }

  delete(id: number) {
    this.docMeta.delete(id);
    this.document.delete(id);
    this.docStatus.delete(id);
  }
  deleteMany(ids: number[]) {
    this.docMeta.deleteMany(ids);
    this.document.deleteMany(ids);
    this.docStatus.deleteMany(ids);
  }
}
