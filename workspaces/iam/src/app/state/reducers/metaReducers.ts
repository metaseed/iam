import { MetaReducer, ActionReducer } from "@ngrx/store";
import { State } from "..";
import { environment } from "environments/environment";
import { storeFreeze } from 'ngrx-store-freeze';

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger, storeFreeze]
  : [];
