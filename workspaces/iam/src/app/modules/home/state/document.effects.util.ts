import { Repository } from "../../../storage/github";
import { DocService } from "../services/doc.service";
import { catchError, switchMap } from "rxjs/operators";
import { DocMeta, Document, DocumentContent } from "../models";
import { of, throwError, Observable } from "rxjs";

export function getContent(repo: Repository, number: number, title: string, format: string, state = 0 ): Observable<DocumentContent> {
  let content = `${DocService.FolderName}/${title}_${number}.${format}`;
  if (!format) content = `${DocService.FolderName}/${title}_${number}`;
  return (<Observable<DocumentContent>>(repo.getContents(content))).pipe( // from url
    catchError(err => {
      if (err.status === 404) {
        if (state===0) {
          state=1;
          return repo.issue.get(number).pipe(
            switchMap(doc => {
              let meta = DocMeta.deSerialize(doc.body);
              title = meta.title;
              format = meta.format || 'md';
              return getContent(repo, number, title, format, state);// from net database
            })
          );
        } else if(format && state===1) {
          state=2; // stop
          return getContent(repo,number,title,'',state); // from net database but without format
        } else {
          return throwError('getContents should stop!');
        }
      }
    })
  );
}

export const NEW_DOC_ID = Number.POSITIVE_INFINITY;

export function getContentUrl(issueNum, title) {
  return `https://metaseed.github.io/iam/doc?id=${issueNum}&title=${encodeURIComponent(title)}`;
}


