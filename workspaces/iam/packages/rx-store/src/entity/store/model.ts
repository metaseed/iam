import { Observable } from "rxjs";
import { EntityCache } from "../cache/mem-cache/models";
import { ID } from "../cache/model/entity-data-service.interface";


export enum EntityChangeType { Add='add', Delete='delete', Update='update', Set='set', Upsert='upsert' }
export type ChangeContent<T> = {
  changeType: EntityChangeType,
  /**
   * ID used only for delete action
   * undefined used for delete all.
   */
  changes: T[] | ID[] | undefined
}

export interface EntityCacheState<T> extends EntityCache<T> {
  changes$: Observable<ChangeContent<T>>;

  currentId?: ID;
}
