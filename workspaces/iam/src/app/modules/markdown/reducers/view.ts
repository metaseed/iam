import { ViewActions, ViewActionTypes } from '../actions/view';

export interface State {
    scrollDown: { scroll: any, isDown: boolean | null };
}

const initialState: State = {
    scrollDown: { scroll: null, isDown: null }
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