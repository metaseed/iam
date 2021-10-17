import { Action } from '@ngrx/store';

export enum DocumentActionTypes {
  Refresh = '[Document] Refresh',
  EditIt = '[Document] edit it'
}



export class RefreshAction implements Action {
  readonly type = DocumentActionTypes.Refresh;
}

export class EditItAction implements Action {
  readonly type = DocumentActionTypes.EditIt;
  constructor(public payload) {}
}

export type DocumentActions = |RefreshAction| EditItAction;
