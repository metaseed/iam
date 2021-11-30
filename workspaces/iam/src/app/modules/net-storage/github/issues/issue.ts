import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Const } from '../model/const';
import { UserInfo } from '../user-info';
import { Requestable } from '../requestable';
import { User } from '../model/user';
import { Label } from '../model/label';
import { Milestone } from '../model/milestone';
import { PullRequest } from '../model/pull-request';
import { concat, map, Observable, of, range, switchMap } from 'rxjs';
import { Labels } from './labels';
import { EditIssueParams, IssueData, IssueListOption } from '../model/issue';


export class Issue extends Labels {
  public id: string;
  public url: string;
  public repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  number: number;
  state: string;
  title: string;
  body: string;
  user: User;
  labels: Label[];
  assignee: User;
  milestone: Milestone;
  locked: boolean;
  comments: number;
  pull_request: PullRequest;
  closed_at: string; // could be null, "2011-04-10T20:09:31Z"
  created_at: string;
  updated_at: string;
  closed_by: User;

  constructor(http: HttpClient, repository: string, userInfo: UserInfo) {
    super(http, repository, userInfo);
  }

  // https://developer.github.com/v3/issues/#create-an-issue
  create(data: IssueData): Observable<Issue> {
    return <Observable<Issue>>(
      this.request('POST', `/repos/${this._userInfo.name}/${this.repository}/issues`, data)
    );
  }


  listIssues(options: IssueListOption) {
    return <Observable<Issue[]>><unknown>this.request('GET',
      `/repos/${this._userInfo.name}/${this.repository}/issues`,
      options
    );
  }

  listWithResponse(option: IssueListOption) {
    return this.http.get(`githubapi/repos/${this._userInfo.name}/${this.repository}/issues`, {
      params: option as any,
      observe: 'response'
    });
  }

  listAllIssues(option: IssueListOption) {
    return this.listWithResponse(option).pipe(switchMap(
      issues => {
        // <https://api.github.com/repositories/104841386/issues?state=all&page=2&per_page=50&sort=created>; rel="next", <https://api.github.com/repositories/104841386/issues?state=all&page=7&per_page=50&sort=created>; rel="last"
        // <https://api.github.com/repositories/104841386/issues?state=all&page=4&per_page=50&sort=created>; rel="prev", <https://api.github.com/repositories/104841386/issues?state=all&page=6&per_page=50&sort=created>; rel="next", <https://api.github.com/repositories/104841386/issues?state=all&page=7&per_page=50&sort=created>; rel="last", <https://api.github.com/repositories/104841386/issues?state=all&page=1&per_page=50&sort=created>; rel="first"
        // <https://api.github.com/repositories/104841386/issues?state=all&page=6&per_page=50&sort=created>; rel="prev", <https://api.github.com/repositories/104841386/issues?state=all&page=1&per_page=50&sort=created>; rel="first"
        const link = issues.headers.get('link');
        if (link) {
          const lastPage = /page=(\d+)&[^<]+; rel="last"/.exec(link)?.[1];
          if (lastPage)
            return concat(
              of(issues.body),
              range(2, +lastPage - 1).pipe(
                map(page => {
                  option.page = page;
                  return this.listWithResponse(option).pipe(map(r => r.body))
                })
              )
            )
        }
        return of(issues.body);
      }
    ));
  }

  listMore(url) {
    return this.http.get(url, {
      observe: 'response'
    });
  }
  // https://developer.github.com/v3/issues/#edit-an-issue
  edit(number, params: EditIssueParams) {
    return this.http.patch(
      `githubapi/repos/${this._userInfo.name}/${this.repository}/issues/${number}`,
      params
    ) as Observable<Issue>;
  }
  // https://docs.github.com/en/rest/reference/issues#get-an-issue
  get(issueNumber: number): Observable<Issue> {
    return <Observable<Issue>>(
      this.request<Issue>(
        'GET',
        `/repos/${this._userInfo.name}/${this.repository}/issues/${issueNumber}`
      )
    );
  }
}
