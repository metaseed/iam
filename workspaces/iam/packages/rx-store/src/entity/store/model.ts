import { Observable } from "rxjs";
import { EntityCache } from "../mem-cache/models";
import { ID } from "../model/entity-data-service.interface";


export enum EntityChangeType { Add, Delete, Update, Set, Upsert }
export type ChangeContent<T> = {
  changeType: EntityChangeType,
  /**
   * undefined used for delete all.
   */
  changes: T[] | ID[] | undefined
}

export interface EntityCacheState<T> extends EntityCache<T> {
  changes$: Observable<ChangeContent<T>>;

  currentId?: ID;
}
