import { MetaReducer, ActionReducer } from '@ngrx/store';
import { State } from './app-reducer';
import { environment } from 'environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    console.log('action', action);
    const stateNew = reducer(state, action);
    console.log('state', state);
    return stateNew;
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger, storeFreeze]
  : [];
