import { Inject, Injectable, InjectionToken } from "@angular/core";
import { StateSubject } from "@metaseed/rx-store";
import { CACHE_FACADE_TOKEN, DocMeta, ICache } from "core";
import { map, pipe, tap } from "rxjs";
import { DocumentEffectsCreate, DocumentEffectsReadBulkDocMeta } from "shared";

export interface IDocumentEffects {
}

export const DOCUMENT_EFFECTS_TOKEN = new InjectionToken<IDocumentEffects>('DOCUMENT_EFFECTS_TOKEN');

@Injectable({ providedIn: 'root' })
export class DocumentsEffects {
  constructor(
    @Inject(CACHE_FACADE_TOKEN)
    private cacheFacade: ICache,
  ) { }

  createDocument_ = new StateSubject<Pick<DocMeta, 'format'>>().addEffect(
    pipe(
      tap<Pick<DocMeta, 'format'>>(data => (this.cacheFacade as any).createDoc(data.format))
    )
  );

  // readBulkDocMeta = new StateSubject<DocumentEffectsReadBulkDocMeta>().addEffect(
  //   (() => {
  //     let keyRangeHigh: number;
  //     let keyRangeLow: number;
  //     let isBelowRange: boolean;

  //     return pipe(
  //       tap<DocumentEffectsReadBulkDocMeta>(action => {
  //         keyRangeHigh = selectIdRangeHigh(this.state.value);
  //         keyRangeLow = selectIdRangeLow(this.state.value);
  //         isBelowRange = action.payload.isBelowRange;
  //       }),
  //       switchMap(action => {
  //         // (low, high]
  //         const key = isBelowRange ? keyRangeLow : keyRangeHigh;
  //         return this.cacheFacade
  //           .readBulkDocMeta(key, isBelowRange)
  //           .pipe(this.actionMonitor.complete(action));
  //       })
  //     );
  //   })()
  // );

}
