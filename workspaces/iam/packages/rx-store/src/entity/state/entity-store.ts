import { Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { state, StateSubject } from "../../core";
import { EntityCache } from "../mem-cache/models";
import { EntityDataService, ID } from "../model/entity-data-service.interface";
import { EntityDataServiceState } from "./entity-data-service-state";


export class EntityStore<T> extends EntityDataServiceState<T> {
  currentId_ = new StateSubject<ID | undefined>();
  private subscription = new Subscription();

  currentEntity$ = state(this.currentId_.pipe(
    map(id => id ? this.cache.entities[id] : undefined),
  ), this.subscription);

  constructor(private cache: EntityDataService<T> & EntityCache<T>) {
    super(cache);
  }


}
