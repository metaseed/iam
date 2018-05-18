import { Action } from '@ngrx/store';

export enum DocumentEffectsActionTypes {
  Load = '[DocumentEffects] Load',
  Delete = '[DocumentEffects] Delete',
  New = '[DocumentEffects] New',
  Save = '[DocumentEffects] Save'
}

export class DocumentEffectsLoad implements Action {
  readonly type = DocumentEffectsActionTypes.Load;
}
export class DocumentEffectsDelete implements Action {
  readonly type = DocumentEffectsActionTypes.Delete;
}
export class DocumentEffectsNew implements Action {
  readonly type = DocumentEffectsActionTypes.New;
}
export class DocumentEffectsSave implements Action {
  readonly type = DocumentEffectsActionTypes.Save;
}

export type DocumentEffectsActions =
  | DocumentEffectsLoad
  | DocumentEffectsDelete
  | DocumentEffectsNew
  | DocumentEffectsSave;
