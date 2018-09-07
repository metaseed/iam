import { ViewActions, ViewActionTypes } from '../actions/view';
import { ScrollEvent } from 'core';

export interface State {
  isScrollDown: boolean;
}

const initialState: State = {
  isScrollDown: null
};

export function reducer(state = initialState, action: ViewActions) {
  switch (action.type) {
    case ViewActionTypes.Scroll: {
      return {
        ...state,
        isScrollDown: action.payload.isScrollDown
      };
    }
    default:
      return state;
  }
}

export const getViewScroll = (state: State) => state.isScrollDown;
