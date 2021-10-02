import { EditActions, EditActionTypes } from '../actions/edit';

export interface State {
  save: string;
  lockScrollWithView: boolean;
  editor: CodeMirror.Editor;
  content: string;
}

export const initialState: State = {
  save: '',
  lockScrollWithView: false,
  editor: undefined, // undefined: initial value; null: unloaded, other value: loaded
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
    case EditActionTypes.LockScrollWithView: {
      return {
        ...state,
        lockScrollWithView: action.payload
      };
    }
    // case EditActionTypes.ContentChanged: {
    //   return {...state,...action.payload};
    // }
    default:
      return state;
  }
}

export const getSave = (state: State) => state.save;
// export const getScrollDown = (state: State) => state.scrollDown;
// export const getEditor = (state: State) => state.editor;
// export const getSavedContent = (state: State) => state.content;
