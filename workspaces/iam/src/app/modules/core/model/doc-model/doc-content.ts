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
     * sha of file; used to update the content, to make sure remote is no edited by other app instance, set with the latest doc content reading from remote.
     *
     * used to trace remote sha, not change locally.
     * used to set the contentSha in DocMeta
     * use contentSha if possible
     * if different from remote: someone/another app instance has updated it.
     * if same wit remote: sync with remote.
     */
    public sha: string,
    /**
     * only set on create, not modifiable
     */
    public format = 'md',
    /**
     * set when find remote cache has deleted, to let near-cache delete this id
     */
    public isDeleted = false
  ) {}
}
