export class DocumentStatus {
  constructor(
    public id: number,
    // editor content changed and not save to store and local db.
    public isEditorDirty?: boolean,
    public isDbDirty?: boolean,
    public isSyncing?: boolean,
    public isEditable?: boolean
  ) {}
}

export class DirtyDocument {
  constructor(public id: number, public changeLog: string) {}
}
