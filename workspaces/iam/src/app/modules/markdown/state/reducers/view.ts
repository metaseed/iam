import { ViewActions, ViewActionTypes } from '../actions/view';
import { ScrollEvent } from 'core';

export interface State {
    scrollDown: ScrollEvent;
}

const initialState: State = {
    scrollDown: null
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
