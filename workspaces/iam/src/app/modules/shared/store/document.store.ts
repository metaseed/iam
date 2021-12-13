import { DocContent, DocMeta, Logger, SearchResult, Tag } from "core";
import { EntityCacheStore, MemEntityCache } from "@rx-store/entity";
import { state, StateSubject } from "@rx-store/core";
import { Injectable, isDevMode } from "@angular/core";
import { DocumentStatus } from "app/modules/core/model/doc-model/doc-status";
import { distinctUntilChanged, map, tap } from "rxjs/operators";
import { pipe } from "rxjs";

export type DocMetaContent = { id: number, meta?: DocMeta, content?: DocContent };
export type DocMetaContentRecord = Record<number, DocMetaContent>

@Injectable({ providedIn: 'root' })
export class DocumentStore {
  private logger = Logger(`${this.constructor.name}`)
  constructor() {
    if (isDevMode()) {
      if (!globalThis.__RX_STORE__) globalThis.__RX_STORE__ = {};
      globalThis.__RX_STORE__.store = this;
    }
    this.currentDocStatus_IsEditable$.subscribe(v => {
      globalThis.document.documentElement.style.setProperty('--iam-is-editable', v ? 'visible' : 'hidden');
    })
  }

  docMeta = new EntityCacheStore<number, DocMeta>(new MemEntityCache({
    idGenerator: e => e.id,
    sortComparer: (a: DocMeta, b: DocMeta) =>
      a.updateDate.getTime() < b.updateDate.getTime()
        ? 1 // switch
        : -1
  }));

  docContent = new EntityCacheStore<number, DocContent>(new MemEntityCache({ idGenerator: e => e.id }));

  docStatus = new EntityCacheStore<number, DocumentStatus>(new MemEntityCache({ idGenerator: e => e.id }));

  tags = new EntityCacheStore<string, Tag>(new MemEntityCache({ idGenerator: e => e.name }));

  currentId_ = new StateSubject<number>().addEffect(pipe(
    tap((id: number) => {
      this.docMeta.currentId_.next(id);
      this.docContent.currentId_.next(id);
      this.docStatus.currentId_.next(id);
    })
  ));

  currentDocMeta$ = this.docMeta.currentEntity$;

  currentDocContent$ = this.docContent.currentEntity$;

  currentDocStatus$ = this.docStatus.currentEntity$;

  currentDocContentString$ = this.currentDocContent$.map(content => content?.content);

  currentDocStatus_IsEditorDirty$ = state(this.currentDocStatus$.pipe(
    map(status => status?.isEditorDirty),
    distinctUntilChanged()
  ));
  currentDocStatus_IsEditable$ = this.currentDocStatus$.map(status => status?.isEditable);

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

  documentOfId$ = this.docContent.entityOfId$;

  docMetaOfId$ = this.docMeta.entityOfId$;

  docMetasOfIds$ = this.docMeta.entitiesOfIds$

  getAllDocuments() { return Object.values(this.docContent.cache.entities) }

  // only id are sorted, we want sorted
  getAllDocMetas() { return this.docMeta.cache.ids.map(id => this.docMeta.cache.entities[id]) }

  getAllDocMetaContent(): DocMetaContentRecord {
    const result: DocMetaContentRecord = {};
    for (const [id, meta] of Object.entries(this.docMeta.cache.entities)) {
      result[id] = { id, meta }
    }
    for (const [id, content] of Object.entries(this.docContent.cache.entities)) {
      result[id] = { ...result[id], ...{ content } }
    }
    return result;
  }

  getDocContent(id: number) {
    return this.docContent.cache.entities[id];
  }

  getDocMeta(id: number) {
    return this.docMeta.cache.entities[id];
  }

  getDocuments(ids: number[]) {
    return ids.map(id => this.docContent.cache.entities[id]);
  }

  getDocMetas(ids: number[]) {
    return ids.map(id => this.docMeta.cache.entities[id]);
  }

  upsertDocStatus(status: Partial<DocumentStatus>, id?: number) {
    id ??= this.docStatus.currentId_.state;
    let statusInStore = this.docStatus.cache.entities[id];
    if (!statusInStore) {
      statusInStore = { id, isEditable: true };
      this.docStatus.set({ ...statusInStore, ...status })
      return;
    }

    this.docStatus.update({
      id,
      changes: status
    })
  }

  delete(id: number) {
    this.logger.debug('delete docMeta...')
    this.docMeta.delete(id);
    this.logger.debug('delete docContent...')
    this.docContent.delete(id);
    this.logger.debug('delete docStatus...')
    this.docStatus.delete(id);
  }
  deleteMany(ids: number[]) {
    this.docMeta.deleteMany(ids);
    this.docContent.deleteMany(ids);
    this.docStatus.deleteMany(ids);
  }
}
