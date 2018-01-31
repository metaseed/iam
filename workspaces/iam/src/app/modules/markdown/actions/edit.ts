import { Action } from "@ngrx/store";


export enum EditActionTypes {
    Save = '[Edit] Save',
    ScrollDown = '[Edit] Scroll Down'
}


export class Save implements Action {
    readonly type = EditActionTypes.Save;
    constructor(public payload: string) { }
}
export class ScrollDown implements Action {
    readonly type = EditActionTypes.ScrollDown;
    constructor(public payload: boolean) { }
}
export type EditActions =
    | Save
    | ScrollDown;