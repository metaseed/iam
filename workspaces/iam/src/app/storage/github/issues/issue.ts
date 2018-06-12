import { HttpClient, HttpHeaders, HttpParams } from '@angular/Common/http';
import { Const } from '../model/const';
import { UserInfo } from '../user-info';
import { Requestable } from '../requestable';
import { User } from '../model/user';
import { Label } from '../model/label';
import { Milestone } from '../model/milestone';
import { PullRequest } from '../model/pull-request';
import { Observable } from 'rxjs';

export interface IssueData {
  title?: string;
  body?: string;
  milestone?: number; // only user with push access can set
  labels?: string[]; // only user with push access
  assignees?: User[]; // only user with push access
}
export interface EditIssueParams extends IssueData {
  state?: 'open' | 'closed';
}
export class Issue extends Requestable {
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
  labels: Label;
  assignee: User;
  milestone: Milestone;
  locked: boolean;
  comments: number;
  pull_request: PullRequest;
  closed_at: string; // could be null, "2011-04-10T20:09:31Z"
  created_at: string;
  updated_at: string;
  closed_by: User;

  constructor(private http: HttpClient, private repository: string, userInfo: UserInfo) {
    super(http, userInfo);
  }

  // https://developer.github.com/v3/issues/#create-an-issue
  create(data: IssueData): Observable<Issue> {
    return <Observable<Issue>>this.request(
      'POST',
      `/repos/${this._userInfo.name}/${this.repository}/issues`,
      data
    );
  }
  // https://developer.github.com/v3/issues/#list-issues-for-a-repository
  list(state: 'open' | 'closed' | 'all') {
    return this.http.get(`githubapi/repos/${this._userInfo.name}/${this.repository}/issues`, {
      params:{state: state}, observe:'response'
    });
  }
  listMore(url) {
    return this.http.get(url, {
       observe:'response'
    });
  }
  // https://developer.github.com/v3/issues/#edit-an-issue
  edit(number, params: EditIssueParams) {
    return this.request(
      'PATCH',
      `/repos/${this._userInfo.name}/${this.repository}/issues/${number}`,
      params
    );
  }
  get(issueNumber: number):Observable<Issue> {
    return <Observable<Issue>>this.request<Issue>(
      'GET',
      `/repos/${this._userInfo.name}/${this.repository}/issues/${issueNumber}`
    );
  }
}
