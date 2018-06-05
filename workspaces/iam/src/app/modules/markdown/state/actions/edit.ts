import { Action } from '@ngrx/store';

export enum EditActionTypes {
  Save = '[Edit] Save',
  ScrollDown = '[Edit] Scroll Down',
  LockScrollWithView = '[Edit] Lock Scroll With View',
  EditorLoaded = '[Edit] Editor Loaded',
  EditorUnloaded = '[Edit] Editor Unloaded',
  ContentChanged = '[Edit] Content Changed'
}

export class EditorLoaded implements Action {
  readonly type = EditActionTypes.EditorLoaded;
  constructor(public payload: { editor: CodeMirror.Editor }) {}
}

export class EditorUnloaded implements Action {
  readonly type = EditActionTypes.EditorUnloaded;
  constructor(public payload: { editor: CodeMirror.Editor }) {}
}

export class ContentChanged implements Action {
  readonly type = EditActionTypes.ContentChanged;
  constructor(public payload: { content: string }) {}
}

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
  constructor(public payload: { scroll: any; isDown: boolean }) {}
}
export type EditActions = Save | LockScrollWithView | ScrollDown |EditorLoaded | EditorUnloaded | ContentChanged;
