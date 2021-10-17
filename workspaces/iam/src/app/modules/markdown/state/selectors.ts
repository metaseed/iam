import { createSelector, createFeatureSelector } from '@ngrx/store';
import { MarkdownState, moduleStateName } from './state-reducers';
import * as fromDocument from './reducers/document';
// document
export const selectMarkdownState = createFeatureSelector<MarkdownState>(moduleStateName);
export const selectDocumentState = createSelector(selectMarkdownState, state => state.document);

export const selectDocumentEditItState = createSelector(
  selectDocumentState,
  fromDocument.getEditIt
);
