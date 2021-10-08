import { interval, asyncScheduler, zip, of, EMPTY, merge } from 'rxjs';
import { tap, subscribeOn, catchError, switchMap, map } from 'rxjs/operators';
import { State, Store } from '@ngrx/store';
import { ICache, DocContent, DataTables, DocMeta, Document } from 'core';
import { Database } from '../database/database-engine';
import { DirtyDocument } from '../core/model/doc-model/doc-status';
import { DocumentStateFacade } from '../shared/state/document/document-state.facade';
import { afterUpdateDoc } from './after-update-doc';

export class DatabaseCacheSaver {
  static readonly SAVE_INTERVAL = 5 * 60 * 1000; //5min

  private docFacade: DocumentStateFacade;

  public autoSave$;
  constructor(
    private db: Database,
    private nextLevelCache: ICache,
    private store: Store<any>,
    private state: State<any>
  ) {
    this.docFacade = new DocumentStateFacade(this.store, this.state);
    this.autoSave$ = interval(DatabaseCacheSaver.SAVE_INTERVAL).pipe(
      switchMap(() => this.db.getAllKeys<number[]>(DataTables.DirtyDocs)),
      switchMap(ids => merge(...(ids.map(id => this.saveToNet(id).pipe(
        afterUpdateDoc(this.store)
      ))))),
      catchError(err => { console.error(err); return EMPTY; })
    )
  }

  public saveToDb(docMeta: DocMeta, content: string, forceSave = false) {
    const docContent = new DocContent(docMeta.id, content, docMeta.contentSha);
    return zip(
      this.db.put<DocContent>(DataTables.DocContent, docContent).pipe(
        subscribeOn(asyncScheduler),
        catchError(err => {
          console.error(err);
          throw err;
        })
      ),
      this.db.put<DocMeta>(DataTables.DocMeta, docMeta).pipe(
        subscribeOn(asyncScheduler),
        catchError(err => {
          console.error(err);
          throw err;
        })
      )
    ).pipe(
      map(([content, meta]) => {
        let status = this.docFacade.getCurrentDocumentStatusState();
        return new Document(docMeta.id, docMeta, docContent, {
          ...status,
          isEditorDirty: false,
          isDbDirty: true
        });
      }),
      switchMap(doc => {
        const ro = this.db.put<DirtyDocument>(DataTables.DirtyDocs, new DirtyDocument(doc.id));
        if (forceSave) {
          return ro.pipe(switchMap(r => this.saveToNet(doc.id)));
        } else {
          return ro.pipe(map(r => doc));
        }
      })
    );
  }

  private saveToNet(id: number) {
    return zip(
      this.db.get<DocContent>(DataTables.DocContent, id).pipe(
        subscribeOn(asyncScheduler),
        catchError(err => {
          console.error(err);
          throw err;
        })
      ),
      this.db.get<DocMeta>(DataTables.DocMeta, id).pipe(
        subscribeOn(asyncScheduler),
        catchError(err => {
          console.error(err);
          throw err;
        })
      )
    ).pipe(
      switchMap(([content, docMeta]) => {
        this.docFacade.setCurrentDocumentSavingToNetStatus();
        return this.nextLevelCache.updateDocument(docMeta, content.content, false).pipe(
          switchMap(doc => {
            this.docFacade.setCurrentDocumentSavedToNetStatus();
            return this.db.delete<DirtyDocument>(DataTables.DirtyDocs, id).pipe(
              map(r => doc)
            );
          })
        );
      })
    );
  }

}
