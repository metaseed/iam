import { PaloadAction } from '../payload-action';

export class CorrelationAction implements PaloadAction {
  type: string;
  payload: any;
  coId = Date.now();
}

export enum ActionStatusActionTypes {
  SetActionStatus = '[StatusMonitor] Set Action Status'
}

export enum ActionState {
  Start = 'Start',
  Succession = 'Succession',
  Fail = 'Fail',
  Complete = 'Complete',
  Timeout = 'Timeout'
}

export class ActionStatus {
  constructor(
    public state: ActionState,
    public action: CorrelationAction,
    public message?: string,
    public context?: any
  ) {}
  isNotStartStatus() {
    return this.state !== ActionState.Start;
  }
}

export class SetActionStatusAction implements PaloadAction {
  type = ActionStatusActionTypes.SetActionStatus;
  constructor(public payload: ActionStatus) {}
}

export type ActionStatusActions = SetActionStatusAction;
