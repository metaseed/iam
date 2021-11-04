import { StateSubject } from "../../core";
import { EntityCache } from "../mem-cache/models";
import { EntityDataService, ID } from "../model/entity-data-service.interface";
import { EntityDataServiceStore } from "./entity-data-service-store";

export type EntityCacheService<T> = EntityDataService<T> & EntityCache<T>;

export class EntityCacheStore<I extends ID,T> extends EntityDataServiceStore<T> {
  currentId_ = new StateSubject<I | undefined>();

  currentEntity$ = this.currentId_.map(id => id != undefined ? this.cache.entities[id] : undefined);

  constructor(protected cache: EntityCacheService<T>) {
    super(cache);
  }


}
