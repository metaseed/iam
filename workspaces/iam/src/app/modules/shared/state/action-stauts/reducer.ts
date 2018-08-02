import { ActionStatusState } from './action-status';
import { PaloadAction } from '../payload-action';
import { SET_ACTION_STATUS_ACTION_TYPE } from './action-status-monitor';

const initState: ActionStatusState = {
  actionStatus: null
};

export function actionStatusReducer(state = initState, action: PaloadAction) {
  switch (action.type) {
    case SET_ACTION_STATUS_ACTION_TYPE: {
      return { ...state, actionStatus: action.payload };
    }
    default:
      return state;
  }
}
