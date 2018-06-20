import { DocMeta } from "./doc-meta";
import { Issue,Content } from 'net-storage';

export interface DocumentContent extends Pick<Content,'content'|'sha'> {}

interface _Document {
  metaData: DocMeta;
  content: DocumentContent;
  contentGeneration: number; // for content modification
}

export interface Document extends Pick<Issue,'number'|'title'|'body'|'labels'|'updated_at'|'state'>, _Document {
}
