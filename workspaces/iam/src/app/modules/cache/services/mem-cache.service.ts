import { Injectable } from "@angular/core";
import { MemEntityCache } from "packages/rx-store/src/entity";
import { Document } from "core";

@Injectable({ providedIn: 'root' })
export class DocMemCacheService extends MemEntityCache<Document> {
  constructor() {
    super({
      idGenerator: e => e.id,
      sortComparer: (a: Document, b: Document) =>
        a.metaData && b.metaData && a.metaData.updateDate.getTime() < b.metaData.updateDate.getTime()
          ? 1 // switch
          : -1
    })
  }
}
