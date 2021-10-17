import { DocumentActions, DocumentActionTypes } from '../actions/document';



export interface State {

  showPreview: boolean | null;
  editIt?: { element: HTMLElement; sourceLine: [number, number] };
}

const initialState: State = {

  showPreview: null
};

export function reducer(state = initialState, action: DocumentActions): State {
  switch (action.type) {

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

export const getShowPreview = (state: State) => state.showPreview;
export const getEditIt = (state: State) => state.editIt;
