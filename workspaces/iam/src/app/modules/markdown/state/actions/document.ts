import { Action } from '@ngrx/store';

export enum DocumentActionTypes {
  EditMode = '[Document] edit mode',
  ViewMode = '[Document] view mode',
  ShowPreview = '[Document] show preview',
  Refresh = '[Document] Refresh',
  HidePreview = '[Document] hide preview',
  EditIt = '[Document] edit it'
}

export class EditMode implements Action {
  readonly type = DocumentActionTypes.EditMode;
}

export class ViewMode implements Action {
  readonly type = DocumentActionTypes.ViewMode;
}

export class ShowPreview implements Action {
  readonly type = DocumentActionTypes.ShowPreview;
}
export class HidePreview implements Action {
  readonly type = DocumentActionTypes.HidePreview;
}

export class RefreshAction implements Action {
  readonly type = DocumentActionTypes.Refresh;
}

export class EditItAction implements Action {
  readonly type = DocumentActionTypes.EditIt;
  constructor(public payload) {}
}

export type DocumentActions = EditMode | ViewMode | ShowPreview | HidePreview | EditItAction;
