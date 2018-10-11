import { Action } from '@ngrx/store';
export interface IPayloadAction extends Action {
  payload: any;
}
