import { ID, IdGenerator } from "../cache/model/entity-data-service.interface";
import { isDevMode } from "../../core/dev-mode-checking";

export function isIdType(id) {
  const type = typeof id;
  return (type === 'number' || type === 'string' || type === 'symbol') && typeof id !== undefined
}

export function idGeneratorWrapper<T>(idGenerator: IdGenerator<T>): IdGenerator<T> {
  return function (entity: T) {
    try {
      const id = idGenerator(entity);
      if (isDevMode()) {
        if (!isIdType(id)) {
          console.warn('rx-store:entity require the id from "idSelector" be number or string\n', `the id is ${id.toString()}\n`, `the idSelector function is:\n ${idGenerator.toString()} `);
        }
      }
      return id;
    } catch (error) {
      throw new Error(`could not generate id from entity:\n ${JSON.stringify(entity)}`);
    }
  }
}
