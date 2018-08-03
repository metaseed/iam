import { PaloadAction } from '../payload-action';
import { ActionStatusActionTypes, ActionStatus, ActionStatusActions } from './actions';

export interface ActionStatusState {
  actionStatus: ActionStatus;
}
const initState: ActionStatusState = {
  actionStatus: null
};

export function actionStatusReducer(state = initState, action: ActionStatusActions) {
  switch (action.type) {
    case ActionStatusActionTypes.SetActionStatus: {
      return { ...state, actionStatus: action.payload };
    }
    default:
      return state;
  }
}
