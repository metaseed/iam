import { Action } from '@ngrx/store';
import { ScrollEvent } from 'core';

export enum ViewActionTypes {
    ScrollDown = '[View] Scroll Down',
}

export class ScrollDown implements Action {
    readonly type = ViewActionTypes.ScrollDown;
    constructor(public payload: ScrollEvent) { }
}

export type ViewActions =
    | ScrollDown;
