import { StateSubject } from "../../core";
import { EntityCache } from "../mem-cache/models";
import { EntityDataService, ID } from "../model/entity-data-service.interface";
import { EntityDataServiceState } from "./entity-data-service-state";


export class EntityStore<T> extends EntityDataServiceState<T> {
  currentId_ = new StateSubject<ID | undefined>();

  currentEntity$ = this.currentId_.map(id => id != undefined ? this.cache.entities[id] : undefined);

  constructor(protected cache: EntityDataService<T> & EntityCache<T>) {
    super(cache);
  }


}
