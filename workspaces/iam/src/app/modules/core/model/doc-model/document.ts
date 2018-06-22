import { DocMeta } from "./doc-meta";
import { Issue,Content } from 'net-storage';

export interface DocContent extends Pick<Content,'content'|'sha'> {}

interface _Document {
  metaData: DocMeta;
  content?: DocContent;
}

export interface Document extends Pick<Issue,'number'>, _Document {
}
