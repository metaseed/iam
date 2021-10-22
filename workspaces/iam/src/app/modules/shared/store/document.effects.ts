import { Inject, Injectable, InjectionToken } from "@angular/core";
import { StateSubject } from "@metaseed/rx-store";
import { CACHE_FACADE_TOKEN, DocFormat, DocMeta, ICache } from "core";
import { pipe } from "rxjs";

export interface IDocumentEffects {
}

export const DOCUMENT_EFFECTS_TOKEN = new InjectionToken<IDocumentEffects>('DOCUMENT_EFFECTS_TOKEN');

@Injectable({ providedIn: 'root' })
export class DocumentsEffects {
  constructor(
    @Inject(CACHE_FACADE_TOKEN)
    private cacheFacade: ICache,
  ) { }

  createDocument_ = new StateSubject<Pick<DocMeta, 'format'>>().addEffect(pipe(
    // this.cacheFacade.CreateDocument
  ));
}
