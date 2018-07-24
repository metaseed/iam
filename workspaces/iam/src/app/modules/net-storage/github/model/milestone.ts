import { User } from './user';

export interface Milestone {
    url: string;
    html_url: string;
    labels_url: string;
    id: number;
    state: string; // open
    title: string; // v1.0
    description: string;
    creator: User;
    open_issues: number;
    closed_issues: number;
    created_at: string; // 2011-04-10T20:09:31Z
    updated_at: string;
    closed_at: string;
    due_one: string;
}
