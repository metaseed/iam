import { Repository } from "../../../storage/github";
import { DocService } from "../services/doc.service";
import { catchError, switchMap } from "rxjs/operators";
import { DocMeta } from "../models/doc-meta";

export function getContent(repo: Repository, number: number, title: string, format: string, state = 0 ) {
  let content = `${DocService.FolderName}/${title}_${number}.${format}`;
  if (!format) content = `${DocService.FolderName}/${title}_${number}`;
  return repo.getContents(content).pipe( // from url
    catchError(err => {
      if (err.status === 404) {
        if (state===0) {
          state=1;
          let doc: Document;
          return repo.issue.get(number).pipe(
            switchMap(doc => {
              let meta = DocMeta.deSerialize(doc.body);
              title = meta.title;
              format = meta.format || 'md';
              return getContent(repo, number, title, format, state);// from database
            })
          );
        } else if(format && state===1) {
          state=2; // stop
          return getContent(repo,number,title,'',state); // from database but without format
        }
      }
    })
  );
}

export const NEW_DOC_ID = 0xffffffff;
