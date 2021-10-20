import { Observable } from "rxjs";

export function pass<T>(o: Observable<T>) {
  return o;
}
