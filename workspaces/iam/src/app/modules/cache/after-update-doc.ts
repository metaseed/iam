import { tap } from "rxjs/operators";
import { Document } from 'core';
import { DocumentStore } from "../shared/store/document.store";

export function afterUpdateDoc(store: DocumentStore) {
  return tap((doc: Document) => {
    const meta = doc.metaData;
    store.update({
      id: meta.id,
      changes: {
        content: doc.content,
        metaData: meta, // sha is update with new doc sha
        documentStatus: doc.documentStatus
      }
    })
  })
}
