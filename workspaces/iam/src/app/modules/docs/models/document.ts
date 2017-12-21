import { Issue } from "../../storage/github/issues/issue";
import { DocMeta } from "./doc-meta";
import { Content } from "../../storage/github/model/content";

export interface Document extends Issue {
    metaData: DocMeta;
    content: Content;

}
