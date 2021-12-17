import { StateSubject } from "../../core";
import { EntityDataService, ID, QueryParams, Update } from "../cache/model/entity-data-service.interface";
import { ChangeContent, EntityChangeType } from "./model";

export class EntityDataServiceStore<T> implements EntityDataService<T> {
  changes$ = new StateSubject<ChangeContent<T>>();

  constructor(protected dataService: EntityDataService<T>) { }

  async add(entity: T) {
    return this.dataService.add(entity).then(
      v => {
        if (v) this.changes$.next({ changeType: EntityChangeType.Add, changes: [v] });
        return v;
      });
  }
  async addMany(entities: T[]) {
    return this.dataService.addMany(entities).then(
      r => {
        const v = r.filter(e => e);
        if (v.length) this.changes$.next({ changeType: EntityChangeType.Add, changes: v as T[] });
        return r;
      }
    );
  }
  async delete(id: ID) {
    return this.dataService.delete(id).then(
      v => {
        if (v) this.changes$.next({ changeType: EntityChangeType.Delete, changes: [id] });
        return v;
      })
  }
  async deleteMany(ids: ID[]) {
    return this.dataService.deleteMany(ids).then(
      r => {
        const v = r.filter(e => e);
        if (v) this.changes$.next({ changeType: EntityChangeType.Delete, changes: v as ID[] });
        return r;
      })
  }
  async deleteAll() {
    return this.dataService.deleteAll().then(
      r => {
        this.changes$.next({ changeType: EntityChangeType.Delete, changes: undefined });
        return r;
      }
    );
  }
  async update(update: Update<T>) {
    return this.dataService.update(update).then(
      v => {
        if (v) this.changes$.next({ changeType: EntityChangeType.Update, changes: [v] });
        return v;
      })
  }
  async updateMany(updates: Update<T>[]) {
    return this.dataService.updateMany(updates).then(
      r => {
        const v = r.filter(e => e);
        if (v.length) this.changes$.next({ changeType: EntityChangeType.Update, changes: v as T[] });
        return r;
      })
  }
  async set(entity: T) {
    return this.dataService.set(entity).then(
      v => {
        this.changes$.next({ changeType: EntityChangeType.Set, changes: [v] });
        return v;
      })
  }
  async setMany(entities: T[]) {
    return this.dataService.setMany(entities).then(
      v => {
        if (v.length) this.changes$.next({ changeType: EntityChangeType.Set, changes: v });
        return v;
      })
  }
  async upsert(entity: T) {
    return this.dataService.upsert(entity).then(
      v => {
        this.changes$.next({ changeType: EntityChangeType.Upsert, changes: [v] });
        return v;
      })
  }
  async upsertMany(updates: T[]) {
    return this.dataService.upsertMany(updates).then(
      v => {
        if (v.length) this.changes$.next({ changeType: EntityChangeType.Upsert, changes: v });
        return v;
      })
  }

  async getAll() {
    return this.dataService.getAll();
  }
  async getById(id: ID) {
    return this.dataService.getById(id);
  }
  async getMany(ids: ID[]) {
    return this.dataService.getMany(ids);
  }

  async getWithQuery(params: string | QueryParams) {
    return this.getWithQuery(params);
  }

}
