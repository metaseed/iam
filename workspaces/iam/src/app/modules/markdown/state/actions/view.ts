import { Action } from '@ngrx/store';
import { ScrollEvent } from 'core';

export enum ViewActionTypes {
  Scroll = '[View] Scroll'
}

export class ViewScrollAction implements Action {
  readonly type = ViewActionTypes.Scroll;
  constructor(public payload: { isScrollDown: boolean }) {}
}
export type ViewActions = ViewScrollAction;
