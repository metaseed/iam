import { map } from "rxjs/operators";
import { state, StateSubject } from "../../core";
import { EntityCache } from "../mem-cache/models";
import { EntityDataService, ID } from "../model/entity-data-service.interface";
import { EntityDataServiceState } from "./entity-data-service-state";


export class EntityState<T> extends EntityDataServiceState<T> {
  currentId_ = new StateSubject<ID | undefined>();

  currentEntity_ = this.currentId_.pipe(
    map(id => id?this.memCache.entities[id]: undefined),
  )

  constructor(private memCache: EntityDataService<T>&EntityCache<T>) {
    super(memCache);
  }


}
