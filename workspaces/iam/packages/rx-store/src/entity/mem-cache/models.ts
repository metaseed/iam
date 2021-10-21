import { ID } from "../entity-data-service.interface";

export interface EntityCache<T> {
  ids: ID[];
  entities: Record<ID, T>;
}
