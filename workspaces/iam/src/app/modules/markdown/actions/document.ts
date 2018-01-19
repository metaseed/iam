import { Action } from "@ngrx/store";

export enum DocumentActionTypes {
    editMode = '[Document] edit mode',
    viewMode = '[Document] reader mode'
}

export class EditMode implements Action {
    readonly type = DocumentActionTypes.editMode;
}

export class ReadMode implements Action {
    readonly type = DocumentActionTypes.viewMode;
}

export type DocumentActions = EditMode | ReadMode;
