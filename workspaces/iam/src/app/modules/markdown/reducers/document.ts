import { DocumentActions, DocumentActionTypes } from "../actions/document";

export enum DocumentMode {
  Init,
  View,
  Edit
}

export interface State {
  mode: DocumentMode;
  showPreview: boolean | null;
}

const initialState: State = {
  mode: DocumentMode.Init,
  showPreview: null
};

export function reducer(state = initialState, action: DocumentActions): State {
  (<any>document).iamMarkdownIsPureViewMode = false;
  switch (action.type) {
    case DocumentActionTypes.EditMode: {
      return {
        ...state,
        mode: DocumentMode.Edit
      };
    }

    case DocumentActionTypes.ViewMode: {
      (<any>document).iamMarkdownIsPureViewMode = true;
      return {
        ...state,
        mode: DocumentMode.View
      };
    }

    case DocumentActionTypes.ShowPreview: {
      return {
        ...state,
        showPreview: true
      };
    }
    case DocumentActionTypes.HidePreview: {
      return {
        ...state,
        showPreview: false
      };
    }

    default:
      return state;
  }
}

export const getMode = (state: State) => state.mode;
export const getShowPreview = (state: State) => state.showPreview;
