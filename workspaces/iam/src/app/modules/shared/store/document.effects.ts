import { Inject, Injectable, InjectionToken } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import {  StateSubject } from "@rx-store/core";
import { State, Store } from "@ngrx/store";
import { CACHE_FACADE_TOKEN, DocMeta, ICache } from "core";
import { map, pipe, switchMap, tap } from "rxjs";
import { selectIdRangeHigh, selectIdRangeLow } from "shared";
import { DocEffectsUtil } from "../state/document/document.effects.util";
import { DocumentState } from "../state/document/document.reducer";
import { OperationState, MonitoredStateSubject } from "@rx-store/effect";

export interface IDocumentEffects {
}

const EFFECT_TIMEOUT = 10_000; // 10s
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
    { type: '[DocumentsEffects]readBulkDocMeta',  timeOut: EFFECT_TIMEOUT}
  );



}

