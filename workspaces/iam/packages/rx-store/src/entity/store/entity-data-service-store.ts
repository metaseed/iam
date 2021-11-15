import { firstValueFrom } from "rxjs";
import { tap } from 'rxjs/operators';
import { StateSubject } from "../../core";
import { AsyncEntityService, EntityDataService, ID, QueryParams, Update } from "../cache/model/entity-data-service.interface";
import { ChangeContent, EntityChangeType } from "./model";

export class EntityDataServiceStore<T> implements AsyncEntityService<T> {
  changes$ = new StateSubject<ChangeContent<T>>();

  constructor(protected dataService: EntityDataService<T>) { }

  async add(entity: T) {
    return firstValueFrom(this.dataService.add(entity).pipe(
      tap(v => {
        if (v) this.changes$.next({ changeType: EntityChangeType.Add, changes: [v] });
      })
    ));
  }
  async addMany(entities: T[]) {
    return firstValueFrom(this.dataService.addMany(entities).pipe(
      tap(v => {
        v = v.filter(e => e);
        if (v.length) this.changes$.next({ changeType: EntityChangeType.Add, changes: v as T[] });
      })
    ));
  }
  async delete(id: ID) {
    return firstValueFrom(this.dataService.delete(id).pipe(
      tap(v => {
        if (v) this.changes$.next({ changeType: EntityChangeType.Delete, changes: [id] });
      })
    ));
  }
  async deleteMany(ids: ID[]) {
    return firstValueFrom(this.dataService.deleteMany(ids).pipe(
      tap(v => {
        v = v.filter(e => e);
        if (v) this.changes$.next({ changeType: EntityChangeType.Delete, changes: v as ID[] });
      })
    ));
  }
  async deleteAll() {
    return firstValueFrom(this.dataService.deleteAll().pipe(
      tap(() => {
        this.changes$.next({ changeType: EntityChangeType.Delete, changes: undefined });
      })
    ));
  }
  async update(update: Update<T>) {
    return firstValueFrom(this.dataService.update(update).pipe(
      tap(v => {
        if (v) this.changes$.next({ changeType: EntityChangeType.Update, changes: [v] });
      })
    ));
  }
  async updateMany(updates: Update<T>[]) {
    return firstValueFrom(this.dataService.updateMany(updates).pipe(
      tap(v => {
        v = v.filter(e => e);
        if (v.length) this.changes$.next({ changeType: EntityChangeType.Update, changes: v as T[] });
      })
    ));
  }
  async set(entity: T) {
    return firstValueFrom(this.dataService.set(entity).pipe(
      tap(v => {
        this.changes$.next({ changeType: EntityChangeType.Set, changes: [v] });
      })
    ));
  }
  async setMany(entities: T[]) {
    return firstValueFrom(this.dataService.setMany(entities).pipe(
      tap(v => {
        if (v.length) this.changes$.next({ changeType: EntityChangeType.Set, changes: v });
      })
    ));
  }
  async upsert(entity: T) {
    return firstValueFrom(this.dataService.upsert(entity).pipe(
      tap(v => {
        this.changes$.next({ changeType: EntityChangeType.Upsert, changes: [v] });
      })
    ));
  }
  async upsertMany(updates: T[]) {
    return firstValueFrom(this.dataService.upsertMany(updates).pipe(
      tap(v => {
        if (v.length) this.changes$.next({ changeType: EntityChangeType.Upsert, changes: v });
      })
    ));
  }

  async getAll() {
    return firstValueFrom(this.dataService.getAll());
  }
  async getById(id: ID) {
    return firstValueFrom(this.dataService.getById(id));
  }
  async getMany(ids: ID[]) {
    return firstValueFrom(this.dataService.getMany(ids));
  }

  async getWithQuery(params: string | QueryParams) {
    return firstValueFrom(this.getWithQuery(params));
  }

}
