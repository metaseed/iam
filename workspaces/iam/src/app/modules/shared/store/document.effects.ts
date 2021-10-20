import { Injectable, InjectionToken } from "@angular/core";
import { StateSubject } from "packages/rx-store/src/core";

export interface IDocumentEffects{
}

export const DOCUMENT_EFFECTS_TOKEN = new InjectionToken<IDocumentEffects>('DOCUMENT_EFFECTS_TOKEN');

@Injectable({providedIn:'root'})
export class DocumentsEffects {

}
