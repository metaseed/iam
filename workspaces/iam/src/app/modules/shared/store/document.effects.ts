import { Inject, Injectable, InjectionToken } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { OperationState, StateSubject } from "@metaseed/rx-store";
import { State, Store } from "@ngrx/store";
import { CACHE_FACADE_TOKEN, DocMeta, ICache } from "core";
import { catchError, map, pipe, switchMap, tap } from "rxjs";
import { DocumentEffectsCreate, DocumentEffectsReadBulkDocMeta, selectIdRangeHigh, selectIdRangeLow } from "shared";
import { DocEffectsUtil } from "../state/document/document.effects.util";
import { DocumentState } from "../state/document/document.reducer";

export interface IDocumentEffects {
}

export const DOCUMENT_EFFECTS_TOKEN = new InjectionToken<IDocumentEffects>('DOCUMENT_EFFECTS_TOKEN');

@Injectable({ providedIn: 'root' })
export class DocumentsEffects {
  constructor(
    @Inject(CACHE_FACADE_TOKEN)
    private cacheFacade: ICache,
    private util: DocEffectsUtil,
    private state: State<DocumentState>,
    private snackbar: MatSnackBar,
    private store: Store<DocumentState>
  ) { }

  operationState = new OperationState();
  createDocument_ = new StateSubject<Pick<DocMeta, 'format'>>().addEffect(
    pipe(
      tap<Pick<DocMeta, 'format'>>(state => (this.cacheFacade as any).createDoc(state.format))
    )
  );

  /**
   * read extend doc meta fetch in cache isBelowRange=true...(low, high]...isBelowRange=false
   */
  readBulkDocMeta_ = new MonitoredStateSubject<{ isBelowRange: boolean }>().addMonitoredEffect(
    status => pipe(
      map((state: { isBelowRange: boolean }) => {
        const keyRangeHigh = selectIdRangeHigh(this.state.value);
        const keyRangeLow = selectIdRangeLow(this.state.value);
        const isBelowRange = state.isBelowRange;

        return { keyRangeHigh, keyRangeLow, isBelowRange };
      }),
      switchMap(({ keyRangeHigh, keyRangeLow, isBelowRange }) => {
        // (low, high]
        const key = isBelowRange ? keyRangeLow : keyRangeHigh;

        return this.cacheFacade
          .readBulkDocMeta(key, isBelowRange)
          .pipe(
            tap(_ => this.operationState.next(status.Complete))
          );
      })
    ),
    { effectName: '[DocumentsEffects]readBulkDocMeta', operationState: this.operationState }
  );



}

