export class DocumentStatus {
  constructor(
    public id: number,
    // editor content changed and not save to store
    public isEditorDirty?:boolean,
    public isStoreDirty?: boolean,
    public isDbDirty?: boolean,
    public isSyncing?: boolean,
    public isEditable?: boolean
  ) {}
}
export class DirtyDocumentInStore {
  constructor(public id: number, public changeLog: string) {}
}

export class DirtyDocument extends DirtyDocumentInStore {
  constructor(public id: number, public changeLog: string,
    // the instance who save the content to store at last time
    public iamInstanceId: number) {
    super(id, changeLog);
  }
}
