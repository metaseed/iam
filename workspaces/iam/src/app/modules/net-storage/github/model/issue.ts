import { User } from "./user";

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
// https://docs.github.com/en/rest/reference/issues#list-repository-issues
export interface IssueListOption{
  milestone?: string;
  /**default: open */
  state?: 'open'|'closed'|'all';
  /** a list of comma separated label names Example: bug,ui,@high */
  labels?: string;
  /**Can be the name of a user. Pass in none for issues with no assigned user, and * for issues assigned to any user. */
  assignee?: string;
  creator?: string;
  mentioned?: string;
  /** default created */
  sort?: 'created'|'updated'|'comments';
  direction?: 'asc'|'desc';
  /** timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ*/
  since?: string;
  /** default 30 */
  per_page?: number;
  /** default 1 */
  page?: number;

}
