
import { Http, RequestOptions, Headers, RequestMethod } from '@angular/http';
import { Const } from '../model/const';
import { UserInfo } from '../user-info';
import { Requestable } from '../requestable';
import { User } from '../model/user';
import { Label } from '../model/label';
import { Milestone } from '../model/milestone';
import { PullRequest } from '../model/pull-request';

export interface IssueData {
    title: string;
    body?: string;
    milestone?: number; // only user with push access can set
    labels?: string[]; // only user with push access
    assignees?: User[]; // only user with push access
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

    constructor(http: Http, private repository: string, userInfo: UserInfo) {
        super(http, userInfo);
    }

    // https://developer.github.com/v3/issues/#create-an-issue
    create(data: IssueData) {
        return this.request(RequestMethod.Post, `/repos/${this.repository}/issues`, data)
            .map((resp) => {
                return <Issue>resp.json();
            });
    }

    //    list(kj)

}
