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
    const status = selectCurrentDocStatus(this.state.value);
    this.store.dispatch(new UpdateCurrentDocumentStatus({ ...status, isMemDirty: memDirty }));
  }

  setCurrentDocumentDbDirtyStatus() {
    const status = selectCurrentDocStatus(this.state.value);
    this.store.dispatch(new UpdateCurrentDocumentStatus({ ...status, isDbDirty: true }));
  }

  modifyCurrentDocumentDbSaveStatus() {
    const status = selectCurrentDocStatus(this.state.value);
    this.store.dispatch(
      new UpdateCurrentDocumentStatus({ ...status, isMemDirty: false, isDbDirty: true })
    );
  }

  modifyCurrentDocumentSavingToNetStatus() {
    const status = selectCurrentDocStatus(this.state.value);
    this.store.dispatch(
      new UpdateCurrentDocumentStatus({ ...status, isSyncing: true })
    );
  }
  modifyCurrentDocumentSavedToNetStatus() {
    const status = selectCurrentDocStatus(this.state.value);
    this.store.dispatch(
      new UpdateCurrentDocumentStatus({ ...status, isDbDirty: false, isSyncing: false })
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
