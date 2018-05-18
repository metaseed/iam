import { Issue } from "../../../storage/github/issues/issue";
import { DocMeta } from "./doc-meta";
import { Content } from "../../../storage/github/model/content";

interface _Document {
  metaData: DocMeta;
  content: Pick<Content,'content'|'sha'>;
  contentGeneration: number; // for content modification
}

export interface Document extends Pick<Issue,'id'|'title'|'body'|'labels'|'number'|'updated_at'|'state'>, _Document {
}
