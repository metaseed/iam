import { DocumentActions, DocumentActionTypes } from "../actions/document";

export enum DocumentMode {
    Init,
    View, Edit
}

export interface State {
    mode: DocumentMode;
}

const initialState: State = {
    mode: DocumentMode.Init,
}

export function reducer(
    state = initialState,
    action: DocumentActions
): State {
    switch (action.type) {
        case DocumentActionTypes.editMode: {
            return {
                ...state,
                mode: DocumentMode.Edit
            };
        }

        case DocumentActionTypes.viewMode: {
            return {
                ...state,
                mode: DocumentMode.View
            };
        }

        default:
            return state;
    }
}

export const getMode = (state: State) => state.mode;
