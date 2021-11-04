import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';
import { StateSubject } from "../../core";
import { EntityDataService, ID, QueryParams, Update } from "../model/entity-data-service.interface";
import { ChangeContent, EntityChangeType } from "./model";

export class EntityDataServiceStore<T> implements EntityDataService<T> {
  changes$ = new StateSubject<ChangeContent<T>>();

  constructor(protected dataService: EntityDataService<T>) { }
  add(entity: T): Observable<T | undefined> {
    return this.dataService.add(entity).pipe(
      tap(v => {
        if (v) this.changes$.next({ changeType: EntityChangeType.Add, changes: [v] });
      })
    );
  }
  addMany(entities: T[]): Observable<(T | undefined)[]> {
    return this.dataService.addMany(entities).pipe(
      tap(v => {
        v = v.filter(e => e);
        if (v.length) this.changes$.next({ changeType: EntityChangeType.Add, changes: v as T[] });
      })
    );
  }
  delete(id: ID): Observable<ID | undefined> {
    return this.dataService.delete(id).pipe(
      tap(v => {
        if (v) this.changes$.next({ changeType: EntityChangeType.Delete, changes: [id] });
      })
    );
  }
  deleteMany(ids: ID[]): Observable<(ID | undefined)[]> {
    return this.dataService.deleteMany(ids).pipe(
      tap(v => {
        v = v.filter(e => e);
        if (v) this.changes$.next({ changeType: EntityChangeType.Delete, changes: v as ID[] });
      })
    );
  }
  deleteAll(): Observable<undefined> {
    return this.dataService.deleteAll().pipe(
      tap(() => {
        this.changes$.next({ changeType: EntityChangeType.Delete, changes: undefined });
      })
    );
  }
  update(update: Update<T>): Observable<T | undefined> {
    return this.dataService.update(update).pipe(
      tap(v => {
        if (v) this.changes$.next({ changeType: EntityChangeType.Update, changes: [v] });
      })
    );
  }
  updateMany(updates: Update<T>[]): Observable<(T | undefined)[]> {
    return this.dataService.updateMany(updates).pipe(
      tap(v => {
        v = v.filter(e => e);
        if (v.length) this.changes$.next({ changeType: EntityChangeType.Update, changes: v as T[] });
      })
    );
  }
  set(entity: T): Observable<T> {
    return this.dataService.set(entity).pipe(
      tap(v => {
        this.changes$.next({ changeType: EntityChangeType.Set, changes: [v] });
      })
    );
  }
  setMany(entities: T[]): Observable<T[]> {
    return this.dataService.setMany(entities).pipe(
      tap(v => {
        if (v.length) this.changes$.next({ changeType: EntityChangeType.Set, changes: v });
      })
    );
  }
  upsert(entity: T): Observable<T> {
    return this.dataService.upsert(entity).pipe(
      tap(v => {
        this.changes$.next({ changeType: EntityChangeType.Upsert, changes: [v] });
      })
    );
  }
  upsertMany(updates: T[]): Observable<T[]> {
    return this.dataService.upsertMany(updates).pipe(
      tap(v => {
        if (v.length) this.changes$.next({ changeType: EntityChangeType.Upsert, changes: v });
      })
    );
  }
  getAll(): Observable<T[]> {
    return this.dataService.getAll();
  }
  getById(id: ID): Observable<T | undefined> {
    return this.getById(id);
  }
  getWithQuery(params: string | QueryParams): Observable<T[]> {
    return this.getWithQuery(params);
  }

}
