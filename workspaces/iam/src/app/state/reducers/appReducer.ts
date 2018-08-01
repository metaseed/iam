import { ActionReducerMap } from '@ngrx/store';
import { State } from '..';
import { coreReducer } from 'core';

export const reducers: ActionReducerMap<State> = { core: coreReducer };
