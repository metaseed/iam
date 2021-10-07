export class DocumentStatus {
  constructor(
    public id: number,
    // editor content changed and not save to store and local db.
    public isEditorDirty?,
    public isDbDirty = false,
    public isSyncing?
  ) {}
}

export class DirtyDocument {
  constructor(public id: number) {}
}
