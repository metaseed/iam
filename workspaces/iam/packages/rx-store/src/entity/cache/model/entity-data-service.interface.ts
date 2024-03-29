export type ID = string | number;

type PromiseFunc<F> = F extends (...args: infer P) => infer R ? (...args: P) => Promise<any> : any
// type modify the member function's return type from Observable to promise.
type AsyncEntityService<T> = {
  [P in keyof EntityDataService<T>]: PromiseFunc<EntityDataService<T>[P]>
}

/**
 * only return successful result all errors are reported via `throw Error('msg')`
 */
export interface EntityDataService<T> {

  /**
   * @param entity
   * @returns of(undefined), if generated id already there, then not added.
   */
  add(entity: T): Promise<T | undefined>;
  /**
   * @param entities
   * @returns entities that added, filtered out entities that already there.
   */
  addMany(entities: T[]): Promise<(T | undefined)[]>;
  /**
   * @param id
   *
   * @returns of(undefined): if can not find id to delete
   */
  delete(id: ID): Promise<ID | undefined>;
  /**
   * @param ids
   *
   * @returns ids that are deleted, filtered out ids not in there.
   */
  deleteMany(ids: ID[]): Promise<(ID | undefined)[]>
  deleteAll(): Promise<undefined>;

  /**
   * merge mew changes only if id is there, if not there `undefined`
   * @param update
   */
  update(update: Update<T>): Promise<T | undefined>;
  updateMany(updates: Update<T>[]): Promise<(T | undefined)[]>;
  /**
 * replace or insert
 * @param entity
 */
  set(entity: T): Promise<T>;
  setMany(entities: T[]): Promise<T[]>;
  /**
   * update or insert
   * here we pass T not Partial<T>, because we want generate id from entity, if we want to pass just partial T,
   * we can make the id irrelevant properties of T optional. (add ? after property name)
   * @param entity
   */
  upsert(entity: T): Promise<T>;
  upsertMany(updates: T[]): Promise<T[]>;
  getAll(): Promise<T[]>;
  getById(id: ID): Promise<T | undefined>;
  getMany(ids: ID[]): Promise<(T | undefined)[]>;
  getWithQuery(params: QueryParams | string): Promise<T[]>;
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
