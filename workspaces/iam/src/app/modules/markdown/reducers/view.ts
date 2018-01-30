import { ViewActions, ViewActionTypes } from '../actions/view';

export interface State {
    scrollDown: boolean;
}

const initialState: State = {
    scrollDown: false
}

export function reducer(state = initialState, action: ViewActions) {
    switch (action.type) {
        case ViewActionTypes.ScrollDown: {
            return {
                ...state,
                scrollDown: action.payload
            }
        }
        default:
            return state;
    }
}

export const getScrollDown = (state: State) => state.scrollDown;