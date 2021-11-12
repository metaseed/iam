import { ID, IdGenerator, SortComparer } from "../model/entity-data-service.interface";

export interface EntityCache<T> {
  ids: ID[];
  entities: Record<ID, T>;
  values: T[];
  sortedValues: T[];
  idGenerator: IdGenerator<T>;
  sortComparer?: SortComparer<T>
}
