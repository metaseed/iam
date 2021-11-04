import { Observable, zip } from "rxjs";
import { Update, QueryParams, ID, EntityDataService } from "./entity-data-service.interface";

export abstract class EntityDataServiceBase<T> implements EntityDataService<T> {

  add(entity: T): Observable<T|undefined> {
    throw new Error("Method not implemented.");
  }
  addMany(entities: T[]): Observable<(T|undefined)[]> {
    return zip(entities.map(e => this.add(e)))
  }
  delete(id: ID): Observable<ID | undefined> {
    throw new Error("Method not implemented.");
  }
  deleteMany(ids: ID[]): Observable<(ID|undefined)[]> {
    return zip(ids.map(id => this.delete(id)));
  }
  deleteAll():Observable<undefined> {
    throw new Error("Method not implemented.");
  }
  update(update: Update<T>): Observable<T|undefined> {
    throw new Error("Method not implemented.");
  }
  updateMany(updates: Update<T>[]): Observable<(T|undefined)[]> {
    return zip(updates.map(e => this.update(e)))
  }
  set(entity:T): Observable<T> {
    throw new Error("Method not implemented.");
  }
  setMany(entities: T[]): Observable<T[]>{
    return zip(entities.map(e => this.set(e)));
  }
  upsert(entity: T): Observable<T> {
    throw new Error("Method not implemented.");
  }
  upsertMany(updates: T[]): Observable<T[]> {
    return zip(updates.map(e => this.upsert(e)));
  }
  getAll(): Observable<T[]> {
    throw new Error("Method not implemented.");
  }
  getById(id: ID): Observable<T|undefined> {
    throw new Error("Method not implemented.");
  }
  getMany(ids:ID[]): Observable<(T|undefined)[]>{
    throw new Error("Method not implemented.");
  }

  getWithQuery(params: string | QueryParams): Observable<T[]> {
    throw new Error("Method not implemented.");
  }

}
