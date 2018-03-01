import { Action } from "@ngrx/store";


export enum EditActionTypes {
    Save = '[Edit] Save',
    ScrollDown = '[Edit] Scroll Down',
    LockScrollWithView = '[Edit] Lock Scroll With View'
}


export class Save implements Action {
    readonly type = EditActionTypes.Save;
    constructor(public payload: string) { }
}

export class LockScrollWithView implements Action {
    readonly type = EditActionTypes.LockScrollWithView;
    constructor(public payload: boolean) { }
}

export class ScrollDown implements Action {
    readonly type = EditActionTypes.ScrollDown;
    constructor(public payload: { scroll: any, isDown: boolean }) { }
}
export type EditActions =
    | Save
    | LockScrollWithView
    | ScrollDown;