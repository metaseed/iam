import * as fromRoot from '../../../state';
import * as fromDocument from './reducers/document';

export const moduleStateName = 'markdown';
interface State extends fromRoot.State {
  [moduleStateName]: MarkdownState;
}

export interface MarkdownState {
  document: fromDocument.State;
}

export const markdownReducers = {
  document: fromDocument.reducer,
};
