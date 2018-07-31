import { SET_ACTION_STATUS_ACTION_TYPE } from '../../home/state';
import { PaloadAction } from './payload-action';

export function coreReducer(state, action: PaloadAction) {
  switch (action.type) {
    case SET_ACTION_STATUS_ACTION_TYPE: {
      return { ...state, actionStatus: action.payload };
    }
    default:
      return state;
  }
}
