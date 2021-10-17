import * as fromRoot from '../../../state';
import * as fromView from './reducers/view';
import * as fromDocument from './reducers/document';

export const moduleStateName = 'markdown';
interface State extends fromRoot.State {
  [moduleStateName]: MarkdownState;
}

export interface MarkdownState {
  document: fromDocument.State;
  view: fromView.State;
}

export const markdownReducers = {
  document: fromDocument.reducer,
  view: fromView.reducer
};
