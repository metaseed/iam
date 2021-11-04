import { combineLatest, distinctUntilChanged, filter, map } from "rxjs";
import { EntityChangeType } from ".";
import { StateSubject, state } from "../../core";
import { EntityCache } from "../mem-cache/models";
import { EntityDataService, ID } from "../model/entity-data-service.interface";
import { EntityDataServiceStore } from "./entity-data-service-store";

export type EntityCacheService<T> = EntityDataService<T> & EntityCache<T>;

export class EntityCacheStore<I extends ID, T> extends EntityDataServiceStore<T> {
  currentId_ = new StateSubject<I | undefined>();
  entities$ = this.changes$.map(()=> Object.values(this.cache.entities))

  currentEntity$ = state(
    combineLatest([
      this.currentId_.pipe(distinctUntilChanged()),
      state(this.changes$.pipe(
        filter(change => {
          const id = this.currentId_.state;
          if (id == undefined) return false;

          if (change.changes) {
            if (change.changeType === EntityChangeType.Delete) {
              return (change.changes as ID[]).indexOf(id) != -1;
            } else {
              for (const ch of change.changes) {
                const chId = this.cache.idGenerator(ch as T);
                if (id === chId) return true;
              }
              return false;
            }
          }
          return true; // undefined: delete all
        })
      ))
    ]).pipe(
      map(() => {
        const id = this.currentId_.state;
        const entity = id != undefined ? this.cache.entities[id] : undefined;
        return entity;
      })
    )
  );

  constructor(protected cache: EntityCacheService<T>) {
    super(cache);
  }

}
