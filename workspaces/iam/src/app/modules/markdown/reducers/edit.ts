import { EditActions, EditActionTypes } from "../actions/edit";

export interface State {
    save: string;
    scrollDown: { scroll: any, isDown: boolean };
}

export const initialState: State = {
    save: '',
    scrollDown: { scroll: null, isDown: false }
}

export function reducer(state = initialState, action: EditActions) {
    switch (action.type) {
        case EditActionTypes.Save: {
            return {
                ...state,
                save: action.payload
            }
        }
        case EditActionTypes.ScrollDown: {
            return {
                ...state,
                scrollDown: action.payload
            }
        }
        default:
            return state;
    }
}

export const getSave = (state: State) => state.save;
export const getScrollDown = (state: State) => state.scrollDown;
