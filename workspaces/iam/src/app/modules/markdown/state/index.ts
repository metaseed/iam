import * as fromDocument from './reducers/document';
import * as fromRoot from '../../../state';
import * as fromEdit from './reducers/edit';
import * as fromView from './reducers/view';

import { createSelector, createFeatureSelector } from '@ngrx/store';
import { getContent } from '../../home/state/document.effects.util';
export interface State extends fromRoot.State {
  markdown: MarkdownState;
}

export interface MarkdownState {
  document: fromDocument.State;
  edit: fromEdit.State;
  view: fromView.State;
}

export const reducers = {
  document: fromDocument.reducer,
  edit: fromEdit.reducer,
  view: fromView.reducer
};

export const selectMarkdownState = createFeatureSelector<MarkdownState>('markdown');

export const selectDocumentState = createSelector(selectMarkdownState, state => state.document);
export const selectDocumentModeState = createSelector(selectDocumentState, fromDocument.getMode);
export const selectDocumentShowPreviewState = createSelector(
  selectDocumentState,
  fromDocument.getShowPreview
);

export const selectEditState = createSelector(selectMarkdownState, state => state.edit);
export const selectEditScrollDownState = createSelector(selectEditState, fromEdit.getScrollDown);
export const selectEditSaveState = createSelector(selectEditState, fromEdit.getSave);
export const selectEditLockScrollWithViewState = createSelector(
  selectEditState,
  state => state.lockScrollWithView
);
// export const selectEditorState = createSelector(selectEditState, fromEdit.getEditor);
// export const selectSavedContentState = createSelector(selectEditState, fromEdit.getSavedContent);

export const selectViewState = createSelector(selectMarkdownState, state => state.view);
export const selectViewScrollDownState = createSelector(selectViewState, fromView.getScrollDown);
