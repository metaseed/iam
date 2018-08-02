import * as fromRoot from '../../../state';
import * as fromView from './reducers/view';
import * as fromDocument from './reducers/document';
import * as fromEdit from './reducers/edit';

export const moduleStateName = 'markdown';
interface State extends fromRoot.State {
  [moduleStateName]: MarkdownState;
}

export interface MarkdownState {
  document: fromDocument.State;
  edit: fromEdit.State;
  view: fromView.State;
}

export const markdownReducers = {
  document: fromDocument.reducer,
  edit: fromEdit.reducer,
  view: fromView.reducer
};
