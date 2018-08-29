import { createSelector, createFeatureSelector } from '@ngrx/store';
import { MarkdownState, moduleStateName } from './state-reducers';
import * as fromDocument from './reducers/document';
import * as fromEdit from './reducers/edit';
// document
export const selectMarkdownState = createFeatureSelector<MarkdownState>(moduleStateName);
export const selectDocumentState = createSelector(selectMarkdownState, state => state.document);
export const selectDocumentModeState = createSelector(selectDocumentState, fromDocument.getMode);
export const selectDocumentShowPreviewState = createSelector(
  selectDocumentState,
  fromDocument.getShowPreview
);
export const selectDocumentEditItState = createSelector(
  selectDocumentState,
  fromDocument.getEditIt
);

// edit
export const selectEditState = createSelector(selectMarkdownState, state => state.edit);
export const selectEditSaveState = createSelector(selectEditState, fromEdit.getSave);
export const selectEditLockScrollWithViewState = createSelector(
  selectEditState,
  state => state.lockScrollWithView
);
// export const selectEditorState = createSelector(selectEditState, fromEdit.getEditor);
// export const selectSavedContentState = createSelector(selectEditState, fromEdit.getSavedContent);

// view
export const selectViewState = createSelector(selectMarkdownState, state => state.view);
