import { DocMeta } from "./doc-meta";
import { Issue,Content } from 'net-storage';
import { DocContent } from "./doc-content";

interface _Document {
  metaData: DocMeta;
  content?: DocContent;
}

export interface Document extends Pick<Issue,'number'>, _Document {
}
