import { Update, QueryParams, ID, EntityDataService } from "./entity-data-service.interface";

export abstract class EntityDataServiceBase<T> implements EntityDataService<T> {

  add(entity: T): Promise<T|undefined> {
    throw new Error("Method not implemented.");
  }
  addMany(entities: T[]): Promise<(T|undefined)[]> {
    return Promise.all(entities.map(e => this.add(e)))
  }
  delete(id: ID): Promise<ID | undefined> {
    throw new Error("Method not implemented.");
  }
  deleteMany(ids: ID[]): Promise<(ID|undefined)[]> {
    return Promise.all(ids.map(id => this.delete(id)));
  }
  deleteAll():Promise<undefined> {
    throw new Error("Method not implemented.");
  }
  update(update: Update<T>): Promise<T|undefined> {
    throw new Error("Method not implemented.");
  }
  updateMany(updates: Update<T>[]): Promise<(T|undefined)[]> {
    return Promise.all(updates.map(e => this.update(e)))
  }
  set(entity:T): Promise<T> {
    throw new Error("Method not implemented.");
  }
  setMany(entities: T[]): Promise<T[]>{
    return Promise.all(entities.map(e => this.set(e)));
  }
  upsert(entity: T): Promise<T> {
    throw new Error("Method not implemented.");
  }
  upsertMany(updates: T[]): Promise<T[]> {
    return Promise.all(updates.map(e => this.upsert(e)));
  }
  getAll(): Promise<T[]> {
    throw new Error("Method not implemented.");
  }
  getById(id: ID): Promise<T|undefined> {
    throw new Error("Method not implemented.");
  }
  getMany(ids:ID[]): Promise<(T|undefined)[]>{
    throw new Error("Method not implemented.");
  }

  getWithQuery(params: string | QueryParams): Promise<T[]> {
    throw new Error("Method not implemented.");
  }

}
