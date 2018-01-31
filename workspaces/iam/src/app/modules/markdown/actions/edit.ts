import { Action } from "@ngrx/store";


export enum EditActionTypes {
    Save = '[Edit] Save',
}

export class Save implements Action {
    readonly type = EditActionTypes.Save;
    constructor(public payload: string) { }
}

export type EditActions =
    | Save;