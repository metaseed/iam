import { Injectable } from '@angular/core';
import { Store, State } from '@ngrx/store';
import { UpdateCurrentDocumentStatus } from './document.actions';
import {
  selectCurrentDocStatus,
  selectCurrentDocument,
  selectCurrentDocumentId
} from './document.selectors';

@Injectable()
export class DocumentStateFacade {
  constructor(private store: Store<any>, private state: State<any>) { }

  updateCurrentDocumentMemDirtyStatus(memDirty: boolean) {
    this.store.dispatch(new UpdateCurrentDocumentStatus({  isEditorDirty: memDirty }));
  }

  setCurrentDocumentDbDirtyStatus() {
    this.store.dispatch(new UpdateCurrentDocumentStatus({ isDbDirty: true }));
  }

  setCurrentDocumentSavedToDbStatus() {
    this.store.dispatch(
      new UpdateCurrentDocumentStatus({ isEditorDirty: false, isDbDirty: true })
    );
  }

  setCurrentDocumentSavingToNetStatus() {
    this.store.dispatch(
      new UpdateCurrentDocumentStatus({ isSyncing: true })
    );
  }
  setCurrentDocumentSavedToNetStatus() {
    this.store.dispatch(
      new UpdateCurrentDocumentStatus({ isDbDirty: false, isSyncing: false })
    );
  }

  getCurrentDocumentStatusState() {
    return selectCurrentDocStatus(this.state.value);
  }
  getCurrentDocumentState() {
    return selectCurrentDocument(this.state.value);
  }
  getCurrentDocumentIdState() {
    return selectCurrentDocumentId(this.state.value);
  }
}
