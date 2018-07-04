import { Action } from '@ngrx/store';
import { ScrollEvent } from 'core';

export enum EditActionTypes {
  Save = '[Edit] Save',
  ScrollDown = '[Edit] Scroll Down',
  LockScrollWithView = '[Edit] Lock Scroll With View',
  EditorLoaded = '[Edit] Editor Loaded',
  EditorUnloaded = '[Edit] Editor Unloaded',
  // ContentChanged = '[Edit] Content Changed'
}

// export class ContentChanged implements Action {
//   readonly type = EditActionTypes.ContentChanged;
//   constructor(public payload: { content: string }) {}
// }

export class Save implements Action {
  readonly type = EditActionTypes.Save;
  constructor(public payload: string) {}
}

export class LockScrollWithView implements Action {
  readonly type = EditActionTypes.LockScrollWithView;
  constructor(public payload: boolean) {}
}

export class ScrollDown implements Action {
  readonly type = EditActionTypes.ScrollDown;
  constructor(public payload:ScrollEvent) {}
}
export type EditActions = Save | LockScrollWithView | ScrollDown;
