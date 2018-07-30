import { Action } from '@ngrx/store';
export interface CorrelationAction extends Action {
  coId: number;
  payload: any;
}
