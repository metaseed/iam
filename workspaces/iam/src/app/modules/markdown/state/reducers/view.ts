import { ViewActions, ViewActionTypes } from '../actions/view';
import { ScrollEvent } from 'core';

export interface State {
  notUsed: ScrollEvent;
}

const initialState: State = {
     notUsed: null
}

export function reducer(state = initialState, action: ViewActions) {
    switch (action.type) {
        // case ViewActionTypes.ScrollDown: {
        //     return {
        //         ...state,
        //         scrollDown: action.payload
        //     }
        // }
        default:
            return state;
    }
}

export const getScrollDown = (state: State) => state.notUsed;
