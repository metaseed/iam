import * as fromDocument from './document';
import * as fromRoot from '../../../reducers';
import * as fromEdit from './edit';
import * as fromView from './view';

import { createSelector, createFeatureSelector } from '@ngrx/store';

export interface MarkdownState {
    document: fromDocument.State;
    edit: fromEdit.State;
    view: fromView.State;
}
export interface State extends fromRoot.State {
    markdown: MarkdownState;
}

export const reducers = {
    document: fromDocument.reducer,
    edit: fromEdit.reducer,
    view: fromView.reducer
}

export const selectMarkdownState = createFeatureSelector<MarkdownState>('markdown')

export const selectDocumentState = createSelector(selectMarkdownState, state => state.document);
export const selectDocumentModeState = createSelector(selectDocumentState, fromDocument.getMode);
export const selectDocumentShowPreviewState = createSelector(selectDocumentState, fromDocument.getShowPreview);

export const selectEditState = createSelector(selectMarkdownState, state => state.edit);
export const selectEditScrollDownState = createSelector(selectEditState, fromEdit.getScrollDown);
export const selectEditSaveState = createSelector(selectEditState, fromEdit.getSave);
export const selectEditLockScrollWithViewState = createSelector(selectEditState, state => state.lockScrollWithView);

export const selectViewState = createSelector(selectMarkdownState, state => state.view);
export const selectViewScrollDownState = createSelector(selectViewState, fromView.getScrollDown);
