export class DocumentStatus {
  constructor(
    public id: number,
    public isMemDirty?, // only in mem
    public isDbDirty = false,
    public isSyncing? // only in mem
  ) {}
}

export class DirtyDocuments {
  constructor(public id: number) {}
}
