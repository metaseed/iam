import { Action } from "@ngrx/store";

export enum DocumentActionTypes {
    EditMode = '[Document] edit mode',
    ViewMode = '[Document] view mode',
    ShowPreview = '[Document] show preview',
    HidePreview = '[Document] hide preview'
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

export type DocumentActions = EditMode | ViewMode | ShowPreview | HidePreview;
