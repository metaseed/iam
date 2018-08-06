import { ActionStatusActionTypes, ActionStatus, ActionStatusActions } from './actions';

export interface ActionMonitorState {
  actionStatus: ActionStatus;
}
const initState: ActionMonitorState = {
  actionStatus: null
};

export function actionMonitorReducer(state = initState, action: ActionStatusActions) {
  switch (action.type) {
    case ActionStatusActionTypes.SetActionStatus: {
      return { ...state, actionStatus: action.payload };
    }
    default:
      return state;
  }
}
export const selectActionStatus = (state: ActionMonitorState) => state.actionStatus;
