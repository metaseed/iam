import * as fromDocument from './document';
import * as fromRoot from '../../../reducers';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export interface MarkdownState {
    document: fromDocument.State;
}
export interface State extends fromRoot.State {
    markdown: MarkdownState;
}

export const reducers = {
    document: fromDocument.reducer
}

export const selectMarkdownState = createFeatureSelector<MarkdownState>('markdown')
export const selectDocumentState = createSelector(selectMarkdownState, state => state.document);
export const selectDocumentModeState = createSelector(selectDocumentState, fromDocument.getMode);
