import { Injectable } from '@angular/core';
import { DocumentStore } from './document.store';

@Injectable()
export class DocumentStateFacade {
  constructor(private store: DocumentStore) { }

  updateCurrentDocumentMemDirtyStatus(memDirty: boolean) {
    this.store.updateCurrentDocStatus({ isEditorDirty: memDirty });
  }

  setCurrentDocumentDbDirtyStatus() {
    this.store.updateCurrentDocStatus({ isDbDirty: true });
  }

  setCurrentDocumentSavedToDbStatus() {
    this.store.updateCurrentDocStatus({ isEditorDirty: false, isDbDirty: true });
  }

  setCurrentDocumentSavingToNetStatus() {
    this.store.updateCurrentDocStatus({ isSyncing: true });
  }

  setCurrentDocumentSavedToNetStatus() {
    this.store.updateCurrentDocStatus({ isDbDirty: false, isSyncing: false })
  }

  getCurrentDocumentStatusState() {
    return this.store.currentDocStatus$.state;
  }

  getCurrentDocumentIdState() {
    return this.store.currentId_.state;
  }
}
