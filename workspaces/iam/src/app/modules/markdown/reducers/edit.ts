import { EditActions, EditActionTypes } from "../actions/edit";

export interface State {
    content: string;
}

export const initialState: State = {
    content: ''
}

export function reducer(state = initialState, action: EditActions) {
    switch (action.type) {
        case EditActionTypes.Save: {
            return {
                ...state,
                content: action.payload
            }
        }
        default:
            return state;
    }
}

export const getSave = (state: State) => state.content;