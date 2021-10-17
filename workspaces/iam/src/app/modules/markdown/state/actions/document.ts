import { Action } from '@ngrx/store';

export enum DocumentActionTypes {
  Refresh = '[Document] Refresh',
}



export class RefreshAction implements Action {
  readonly type = DocumentActionTypes.Refresh;
}


