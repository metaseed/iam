import { Action } from "@ngrx/store";

export enum DocsActionTypes {
  Load = '[Docs] Load',
  LoadSuccess = '[Docs] Load Success',
  LoadFail = '[Docs] Load Fail',
  AddDoc = '[Docs'

}

export class Load implements Action {
  readonly type = DocsActionTypes.Load;
}
