import { Content } from 'net-storage';

export interface IDocContent extends Pick<Content, 'content' | 'sha'> {
  id: number;
  isDeleted: boolean;
}

export class DocContent implements IDocContent {
  constructor(
    public id: number,
    public content: string,
    // used to trace remote sha, not change locally.
    // if different: someone/another app instance has updated it.
    // if same: sync with remote.
    public sha: string,
    public isDeleted = false
  ) {}
}
