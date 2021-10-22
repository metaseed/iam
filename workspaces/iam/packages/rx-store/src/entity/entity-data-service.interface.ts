import { Observable } from "rxjs";

export type ID = keyof any;

/**
 * only return successful result all errors are reported via `throw Error('msg')`
 */
export interface EntityDataService<T> {
  /**
   * @param entity
   * @returns of(undefined), if generated id already there.
   */
  add(entity: T): Observable<T | undefined>;
  /**
   * @param entities
   * @returns entities that added, filtered out entities that already there.
   */
  addMany(entities: T[]): Observable<(T | undefined)[]>;
  /**
   * @param id
   *
   * @returns of(undefined): if can not find id to delete
   */
  delete(id: ID): Observable<ID | undefined>;
  /**
   * @param ids
   *
   * @returns ids that are deleted, filtered out ids not in there.
   */
  deleteMany(ids: ID[]): Observable<(ID | undefined)[]>
  deleteAll();

  update(update: Update<T>): Observable<T | undefined>;
  updateMany(updates: Update<T>[]): Observable<(T | undefined)[]>;
  /**
 * replace or insert
 * @param entity
 */
  set(entity: T): Observable<T>;
  setMany(entities: T[]): Observable<T[]>;
  upsert(entity: T): Observable<T>;
  upsertMany(updates: T[]): Observable<T[]>;
  getAll(): Observable<T[]>;
  getById(id: ID): Observable<T | undefined>;
  getWithQuery(params: QueryParams | string): Observable<T[]>;
}

export interface QueryParams {
  [name: string]: string | string[];
}

export interface Update<T> {
  id: ID;
  changes: Partial<T>;
}

export type IdGenerator<T> = (entity: T) => ID;

/**
 * return positive value if switch a and b
 */
export type SortComparer<T> = (a: T, b: T) => number;
