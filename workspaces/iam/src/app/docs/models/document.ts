import { Issue } from "../../storage/github/issues/issue";
import { DocMeta } from "./doc-meta";

export interface Document extends Issue {
    metaData: DocMeta;

}
