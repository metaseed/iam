import { Action } from "@ngrx/store";

export enum DocumentActionTypes {
    editMode = '[Document] edit mode',
    viewMode = '[Document] view mode'
}

export class EditMode implements Action {
    readonly type = DocumentActionTypes.editMode;
}

export class ViewMode implements Action {
    readonly type = DocumentActionTypes.viewMode;
}

export type DocumentActions = EditMode | ViewMode;
