export class DocumentStatus {
  constructor(
    public id: number,
    public isDbDirty = false,
    public isMemDirty?, // only in mem
    public isSyncing? // only in mem
  ) {}
}

export class DirtyDocuments {
  constructor(public id: number) {}
}
