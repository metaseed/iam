import { map, Observable, of } from "rxjs";
import { isDevMode } from "../../core/dev-mode-checking";
import { EntityDataServiceBase } from "../model/entity-data-service-base";
import { ID, IdGenerator, QueryParams, SortComparer, Update } from "../model/entity-data-service.interface";
import { idGeneratorWrapper } from "../utils/id-generator-wrapper";
import { removeItem } from "../utils/remove-array-item";
import { sortComparerWrapper } from "../utils/sort-comparer-wrapper";
import { EntityCache } from "./models";

type IdEntityPair<T> = { id: ID; entity: T }

export class MemEntityCache<T> extends EntityDataServiceBase<T> implements EntityCache<T> {
  ids: ID[] = [];
  entities: Record<ID, T> = Object.create(null); // not use {}, to remove inheritance from Object.prototype.

  public idGenerator: IdGenerator<T>;
  public sortComparer?: SortComparer<T>

  constructor(option:{idGenerator: IdGenerator<T>, sortComparer?: SortComparer<T>}) {
    super();
    this.idGenerator = idGeneratorWrapper(option.idGenerator);
    if (option.sortComparer) this.sortComparer = sortComparerWrapper(option.sortComparer);
    if (isDevMode()) {
      if (!globalThis.__MemDataService__) globalThis.__MemDataService__ = [];
      globalThis.__MemDataService__.push(this);
    }
  }

  add(entity: T): Observable<T | undefined> {
    return this.addMany([entity]).pipe(map(a => a[0]));
  }

  addMany(entities: T[]): Observable<(T | undefined)[]> {
    const result: (T | undefined)[] = [];
    const toAdd = entities.map(e => ({ id: this.idGenerator(e), entity: e })).filter(ep => {
      const notIn = this.ids.indexOf(ep.id) === -1;
      result.push(notIn ? ep.entity : toUndefined(ep.entity, `addMany: entity not added: this id: ${ep.id.toString()} is already there.`))
      return notIn
    });
    insert(toAdd, this, this.sortComparer);
    return of(result);
  }

  delete(id: ID): Observable<ID | undefined> {
    if (this.ids.indexOf(id) === -1) return of(toUndefined(id, `delete: not deleted: ${id.toString()} not exist`));
    this.deleteId(id);
    return of(id);
  }

  deleteAll(): Observable<undefined> {
    this.ids = [];
    this.entities = {};
    return of(undefined);
  }

  update(update: Update<T>): Observable<T | undefined> {
    return this.updateMany([update]).pipe(map(a => a[0]));
  }

  updateMany(updates: Update<T>[]): Observable<(T | undefined)[]> {
    return this.changeOrInsert(updates, { insert: false, update: true });
  }

  set(entity: T): Observable<T> {
    return this.setMany([entity]).pipe(map(es => es[0]));
  }

  setMany(entities: T[]): Observable<T[]> {
    // replace or insert
    const changes = entities.map(e => ({ id: this.idGenerator(e), changes: e }));
    return this.changeOrInsert(changes, { insert: true, update: false }) as Observable<T[]>
  }

  upsert(entity: T): Observable<T> {
    return this.upsertMany([entity]).pipe(map(es => es[0]));
  }

  upsertMany(entities: T[]): Observable<T[]> {
    const changes = entities.map(e => ({ id: this.idGenerator(e), changes: e }));
    return this.changeOrInsert(changes, { insert: true, update: true }) as Observable<T[]>
  }

  getAll(): Observable<T[]> {
    if (this.sortComparer)
      return of(this.ids.map(id => this.entities[id]));
    else
      return of(Object.values(this.entities));
  }
  getById(id: ID): Observable<T | undefined> {
    return of(this.entities[id]);
  }
  getMany(ids:ID[]): Observable<(T|undefined)[]>{
    return of(ids.map(id => this.entities[id]))
  }
  getWithQuery(params: string | QueryParams): Observable<T[]> {
    throw new Error("Method not implemented.");
  }

  private deleteId(id) {
    delete this.entities[id];
    removeItem(this.ids, id);
  }

  private changeOrInsert(changeEntities: Update<T>[],
    option: {
      /**add if id is not there */
      insert: boolean,
      /**update(merge new) or replace */
      update: boolean
    }): Observable<(T | undefined)[]> {
    const result: (T | undefined)[] = [];
    const idEntityPairToAdd: IdEntityPair<T>[] = [];

    for (const { id, changes } of changeEntities) {
      const entityInCache = this.entities[id];
      if (!entityInCache) {
        if (option.insert) {
          result.push(changes as T);
          idEntityPairToAdd.push({ id, entity: changes as T })
        }
        else
          result.push(toUndefined(changes, `updateMany: entity not updated: can not find id for it.`));
        continue;
      }
      const newEntity = option.update ? { ...entityInCache, ...changes } : changes as T;
      const newId = this.idGenerator(newEntity);
      result.push(newEntity);
      if (id === newId) {
        this.entities[id] = newEntity;
      } else {
        this.deleteId(id);
        idEntityPairToAdd.push({ id: newId, entity: newEntity });
      }
    }
    insert(idEntityPairToAdd, this, this.sortComparer);
    return of(result);
  }
}

function toUndefined(e: any, msg: string) {
  if (isDevMode()) {
    console.warn(`MemDataService:${msg}\n entity: \n`, e)
  }
  return undefined;
}

function insert<T>(idEntityPairs: IdEntityPair<T>[], cache: EntityCache<T>, entitySortComparer?: SortComparer<T>) {
  try {
    if (!entitySortComparer) {
      for (const { id, entity } of idEntityPairs) {
        cache.ids.push(id);
        cache.entities[id] = entity;
      }
    } else {
      let i = 0;
      let j = 0;
      const ids: ID[] = [];
      //note: entities would be modified here by sort
      idEntityPairs.sort((a, b) => entitySortComparer(a.entity, b.entity));

      while (i < idEntityPairs.length && j < cache.ids.length) {
        const { id, entity } = idEntityPairs[i];
        const idInCache = cache.ids[j];
        const entityInCache = cache.entities[idInCache];

        if (entitySortComparer(entity, entityInCache) <= 0) {
          ids.push(id);
          i++;
        } else {
          ids.push(idInCache);
          j++;
        }
      }

      if (i < idEntityPairs.length) {
        cache.ids = ids.concat(idEntityPairs.slice(i).map(ep => ep.id));
      } else {
        cache.ids = ids.concat(cache.ids.slice(j));
      }

      for (const { id, entity } of idEntityPairs) {
        cache.entities[id] = entity;
      }
    }
  } catch (e: any) {
    console.error(e);
    let error = 'MemDataService: error happens while add entities to cache.\n';
    if (e?.message) error += e?.message;
    throw new Error(error);
  }
}
