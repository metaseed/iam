import { map, Observable, of } from "rxjs";
import { isDevMode } from "..";
import { EntityDataServiceBase } from "../entity-data-service-base";
import { ID, IdGenerator, QueryParams, SortComparer, Update } from "../entity-data-service.interface";
import { idGeneratorWrapper } from "../utils/id-generator-wrapper";
import { removeItem } from "../utils/remove-array-item";
import { sortComparerWrapper } from "../utils/sort-comparer-wrapper";
import { EntityCache } from "./models";

type IdEntityPair<T> = { id: ID; entity: T }

export class MemDataService<T> extends EntityDataServiceBase<T> implements EntityCache<T> {
  ids: ID[] = [];
  entities: Record<ID, T> = Object.create(null); // not use {}, to remove inheritance from Object.prototype.

  constructor(private idGenerator: IdGenerator<T>, private sortComparer?: SortComparer<T>) {
    super();
    this.idGenerator = idGeneratorWrapper(idGenerator);
    if (sortComparer) this.sortComparer = sortComparerWrapper(sortComparer);
  }

  add(entity: T): Observable<T | undefined> {
    return this.addMany([entity]).pipe(map(a => a[0]));
  }

  addMany(entities: T[]): Observable<(T | undefined)[]> {
    const toAdd = entities.map(e => ({ id: this.idGenerator(e), entity: e })).filter(ep => this.ids.indexOf(ep.id) === -1);
    add(toAdd, this, this.sortComparer);
    const result = entities.map(e => this.ids.indexOf(this.idGenerator(e)) === -1 ? e : toUndefined(e, 'add: this id already there'))
    return of(result);
  }

  delete(id: ID): Observable<ID | undefined> {
    if (this.ids.indexOf(id) === -1) return of(toUndefined(id, `${id.toString()} not exist`));

    delete this.entities[id];
    removeItem(this.ids, id);
    return of(id);
  }

  update(update: Update<T>): Observable<T | undefined> {

  }

  updateMany(updates: Update<T>[]): Observable<(T | undefined)[]> {
    const result: (T | undefined)[] = [];
    const idEntityPairToAdd: IdEntityPair<T>[] = [];

    for (const { id, changes } of updates) {
      const entityInCache = this.entities[id];
      if (!entityInCache) {
        result.push(toUndefined(changes,`updateMany: entity not updated: can not find id for it.`));
        continue;
      }
      const mergedEntity = { ...entityInCache, ...changes }
      const newId = this.idGenerator(mergedEntity);
      result.push(mergedEntity);
      if (id === newId) {
        this.entities[id] = mergedEntity;
      } else {
        delete this.entities[id];
        removeItem(this.ids, id);
        idEntityPairToAdd.push({ id: newId, entity: mergedEntity });
      }
    }
    add(idEntityPairToAdd,this,this.sortComparer);
    return of(result);
  }
  set(entity: T): Observable<T> {

  }

  upsert(entity: T): Observable<T> {

  }



  getAll(): Observable<T[]> {
    const entities = Object.values(this.entities);
    if (this.sortComparer)
      return of(this.ids.map(id => this.entities[id]));
    else
      return of(entities);
  }
  getById(id: ID): Observable<T | undefined> {
    return of(this.entities[id]);
  }
  getWithQuery(params: string | QueryParams): Observable<T[]> {
    throw new Error("Method not implemented.");
  }
}

function toUndefined(e: any, msg: string) {
  if (isDevMode()) {
    console.warn(`MemDataService:${msg}\n entity: \n`, e)
  }
  return undefined;
}

function add<T>(idEntityPairs: IdEntityPair<T>[], cache: EntityCache<T>, entitySortComparer?: SortComparer<T>) {
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
