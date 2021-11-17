import { Content } from 'net-storage';

export interface IDocContent extends Pick<Content, 'content' | 'sha'> {
  id: number;
  isDeleted: boolean;
}

export class DocContent implements IDocContent {
  constructor(
    public id: number,
    public content: string,

    /**
     * used to trace remote sha, not change locally.
     * used to set the contentSha in DocMeta
     * use contentSha if possible
     * if different from remote: someone/another app instance has updated it.
     * if same wit remote: sync with remote.
     */
    public sha: string,
    public format = 'md',
    public isDeleted = false
  ) {}
}
