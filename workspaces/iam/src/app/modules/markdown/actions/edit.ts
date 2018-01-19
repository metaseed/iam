import { Action } from "@ngrx/store";


export enum EditActionTypes {
    Save = '[Edit] Save',
}

export class Save implements Action {
    readonly type = EditActionTypes.Save;
}

export type EditActions =
    | Save;