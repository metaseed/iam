import { SET_ACTION_STATUS_ACTION_TYPE, ActionStatus } from './action-stauts';
import { PaloadAction } from './payload-action';

export interface CoreState {
  actionStatus?: ActionStatus;
}

const initState: CoreState = {
  actionStatus: null
};

export function coreReducer(state = initState, action: PaloadAction) {
  switch (action.type) {
    case SET_ACTION_STATUS_ACTION_TYPE: {
      return { ...state, actionStatus: action.payload };
    }
    default:
      return state;
  }
}
export const selectActionStatus = (state: CoreState) => state.actionStatus;
