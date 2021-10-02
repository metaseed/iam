import { DocumentActions, DocumentActionTypes } from '../actions/document';

export enum DocumentMode {
  View,
  Edit
}

export interface State {
  mode: DocumentMode;
  showPreview: boolean | null;
  editIt?: { element: HTMLElement; sourceLine: [number, number] };
}

const initialState: State = {
  mode: DocumentMode.View,
  showPreview: null
};

export function reducer(state = initialState, action: DocumentActions): State {
  switch (action.type) {
    case DocumentActionTypes.EditMode: {
      (<any>document).iamMarkdownIsPureViewMode = false;
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
    case DocumentActionTypes.EditIt: {
      return {
        ...state,
        editIt: action.payload
      };
    }

    default:
      return state;
  }
}

export const getMode = (state: State) => state.mode;
export const getShowPreview = (state: State) => state.showPreview;
export const getEditIt = (state: State) => state.editIt;
