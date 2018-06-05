import { EditActions, EditActionTypes } from '../actions/edit';

export interface State {
  save: string;
  scrollDown: { scroll: any; isDown: boolean | null };
  lockScrollWithView: boolean;
  editor: CodeMirror.Editor;
  content: string;
}

export const initialState: State = {
  save: '',
  scrollDown: { scroll: null, isDown: null },
  lockScrollWithView: false,
  editor: undefined,//undefined: initial value; null: unloaded, other value: loaded
  content: undefined
};

export function reducer(state = initialState, action: EditActions) {
  switch (action.type) {
    case EditActionTypes.Save: {
      return {
        ...state,
        save: action.payload
      };
    }
    case EditActionTypes.ScrollDown: {
      return {
        ...state,
        scrollDown: action.payload
      };
    }
    case EditActionTypes.LockScrollWithView: {
      return {
        ...state,
        lockScrollWithView: action.payload
      };
    }
    case EditActionTypes.EditorLoaded: {
      return { ...state, ...action.payload };
    }
    case EditActionTypes.EditorUnloaded: {
      return { ...state, editor: null };
    }
    case EditActionTypes.ContentChanged: {
      return {...state,...action.payload};
    }
    default:
      return state;
  }
}

export const getSave = (state: State) => state.save;
export const getScrollDown = (state: State) => state.scrollDown;
export const getEditor = (state: State) => state.editor;
export const getContent = (state: State) => state.content;
