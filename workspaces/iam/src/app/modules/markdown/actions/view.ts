import { Action } from '@ngrx/store';

export enum ViewActionTypes {
    ScrollDown = '[View] Scroll Down',
}

export class ScrollDown implements Action {
    readonly type = ViewActionTypes.ScrollDown;
    constructor(public payload: { scroll: any, isDown: boolean }) { }
}

export type ViewActions =
    | ScrollDown;