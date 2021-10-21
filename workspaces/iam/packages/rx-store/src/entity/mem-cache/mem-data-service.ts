import { map, Observable, of } from "rxjs";
import { isDevMode } from "..";
import { EntityDataServiceBase } from "../entity-data-service-base";
import { ID, IdGenerator, QueryParams, SortComparer, Update } from "../entity-data-service.interface";
import { idGeneratorWrapper } from "../utils/id-generator-wrapper";
import { removeItem } from "../utils/remove-array-item";
import { sortComparerWrapper } from "../utils/sort-comparer-wrapper";
import { EntityCache } from "./models";

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
    if (isDevMode()) {
      entities.filter(ent => this.ids.indexOf(this.idGenerator(ent)) !== -1).forEach(ent => console.warn('MemDataService: entity is not add,\n id of entity already there, entity: \n', ent));
    }
    const toAdd = entities.filter(ent => this.ids.indexOf(this.idGenerator(ent)) === -1);
    add(toAdd, this, this.idGenerator, this.sortComparer);
    const result = entities.map(e => this.ids.indexOf(this.idGenerator(e)) === -1 ? e : undefined)
    return of(result);
  }

  delete(id: ID): Observable<ID | undefined> {
    if (this.ids.indexOf(id) === -1) return of(undefined);

    delete this.entities[id];
    removeItem(this.ids, id);
    return of(id);
  }

  update(update: Update<T>): Observable<T | undefined> {

  }
  set(entity:T): Observable<T>{

  }

  upsert(entity: T): Observable<T | undefined> {

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

function add<T>(entities: T[], cache: EntityCache<T>, idGenerator: IdGenerator<T>, sortComparer?: SortComparer<T>) {
  try {
    if (!sortComparer) {
      for (const entity of entities) {
        const id = idGenerator(entity)
        cache.ids.push(id);
        cache.entities[id] = entity;
      }
    } else {
      let i = 0;
      let j = 0;
      const ids: ID[] = [];
      entities.sort(sortComparer);

      while (i < entities.length && j < cache.ids.length) {
        const entity = entities[i];
        const id = idGenerator(entity);
        const idInCache = cache.ids[j];
        const entityInCache = cache.entities[idInCache];

        if (sortComparer(entity, entityInCache) <= 0) {
          ids.push(id);
          i++;
        } else {
          ids.push(idInCache);
          j++;
        }
      }

      if (i < entities.length) {
        cache.ids = ids.concat(entities.slice(i).map(idGenerator));
      } else {
        cache.ids = ids.concat(cache.ids.slice(j));
      }

      entities.forEach((model, i) => {
        cache.entities[idGenerator(model)] = model;
      });
    }
  } catch (e: any) {
    console.error(e);
    let error = 'MemDataService: error happens while add entities to cache.\n';
    if (e?.message) error += e?.message;
    throw new Error(error);
  }
}
