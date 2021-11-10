import { combineLatest, distinctUntilChanged, filter, map, startWith } from "rxjs";
import { ChangeContent, EntityChangeType } from ".";
import { StateSubject, state } from "../../core";
import { isDevMode } from "../../core/dev-mode-checking";
import { EntityCache } from "../mem-cache/models";
import { EntityDataService, ID } from "../model/entity-data-service.interface";
import { EntityDataServiceStore } from "./entity-data-service-store";

export type EntityCacheService<T> = EntityDataService<T> & EntityCache<T>;

export class EntityCacheStore<I extends ID, T> extends EntityDataServiceStore<T> {
  currentId_ = new StateSubject<I | undefined>();
  entities$ = this.changes$.map(() => Object.values(this.cache.entities))

  entity$(id: I) {
    return this.changes$.pipe(
      filter(change => this.isChangeRelatedToId(change, [id])),
      map(() => this.cache.entities[id]),
      startWith(this.cache.entities[id])
    );
  }

  entitiesOfIds$(ids: I[]) {
    return this.changes$.pipe(
      filter(change => this.isChangeRelatedToId(change, ids)),
      map(() => ids.map(id => this.cache.entities[id])),
      startWith(ids.map(id => this.cache.entities[id]))
    );
  }

  currentEntity$ = state(
    combineLatest([
      this.currentId_.pipe(distinctUntilChanged()),
      this.changes$
    ]).pipe(
      filter(([id, change]) => {
        if (id == undefined) return false;
        return this.isChangeRelatedToId(change, [id]);
      }),
      map(() => {
        const id = this.currentId_.state;
        const entity = id != undefined ? this.cache.entities[id] : undefined;
        return entity;
      })
    )
  );

  private isChangeRelatedToId(change: ChangeContent<T>, ids: I[]) {
    if (!ids?.length) return false;

    if (change.changes) {
      if (change.changeType === EntityChangeType.Delete) {
        return ids.some(id => (change.changes as ID[]).indexOf(id) != -1);
      } else {
        for (const ch of change.changes) {
          const chId = this.cache.idGenerator(ch as T) as I;
          if (ids.indexOf(chId) !== -1) return true;
        }
        return false;
      }
    }
    return true; // changes = undefined: delete all
  }

  constructor(protected cache: EntityCacheService<T>) {
    super(cache);

    if (isDevMode()) {
      if (!globalThis.__RX_STORE__) globalThis.__RX_STORE__ = {};
      globalThis.__RX_STORE__.MemDataService = this;
    }
  }

}
