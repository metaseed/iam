import { SortComparer } from "../entity-data-service.interface";

export function sortComparerWrapper<T>(sortComparer: SortComparer<T>) {
  return (a:T,b:T)=> {
    try {
      return sortComparer(a,b);
    } catch (err) {
      throw new Error(`error while compare 2 entities:\n a:\n ${a}\nb:\n${b}`);
    }
  }
}
