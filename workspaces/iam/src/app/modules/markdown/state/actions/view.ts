import { Action } from '@ngrx/store';
import { ScrollEvent } from 'core';

export enum ViewActionTypes {
    NotUsed = '[View] Scroll Down',
}

export class NotUsed implements Action {
    readonly type = ViewActionTypes.NotUsed;
    constructor(public payload: ScrollEvent) { }
}

export type ViewActions =
    | NotUsed;
