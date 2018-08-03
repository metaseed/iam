import { ActionStatusActionTypes, ActionStatus, ActionStatusActions } from './actions';

export interface ActionStatusMonitorState {
  actionStatus: ActionStatus;
}
const initState: ActionStatusMonitorState = {
  actionStatus: null
};

export function actionStatusMonitorReducer(state = initState, action: ActionStatusActions) {
  switch (action.type) {
    case ActionStatusActionTypes.SetActionStatus: {
      return { ...state, actionStatus: action.payload };
    }
    default:
      return state;
  }
}
export const selectActionStatus = (state: ActionStatusMonitorState) => state.actionStatus;
