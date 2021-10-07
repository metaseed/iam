import { Store } from "@ngrx/store";
import { tap } from "rxjs/operators";
import { Document } from 'core';
import { UpdateDocument } from "shared";

export function afterUpdateDoc(store: Store<any>) {
  return tap((doc: Document) => {
    const meta = doc.metaData;
    store.dispatch(
      new UpdateDocument({
        collectionDocument: {
          id: meta.id,
          changes: {
            content: doc.content,
            metaData: meta, // sha is update with new doc sha
            documentStatus: doc.documentStatus
          }
        }
      })
    );
  })
}
