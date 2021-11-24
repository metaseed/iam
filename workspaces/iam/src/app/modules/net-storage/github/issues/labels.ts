import { HttpClient } from "@angular/common/http";
import { concat, of, range } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { Requestable } from "../requestable";
import { UserInfo } from "../user-info";

export interface LabelData {
  name: string;
  /**
   * hex color start without the #
   */
  color?: string;
  description?: string;

}

export class Labels extends Requestable {
  public fullName: string;

  constructor(protected http: HttpClient, protected repository: string, userInfo: UserInfo) {
    super(http, userInfo);
    this.fullName = `${this._userInfo.name}/${this.repository}`;
  }
  /**
   * Create a new label
   * @see https://developer.github.com/v3/issues/labels/#create-a-label
   * @param {Object} labelData - the label definition
   */
  createLabel(labelData: LabelData) {
    return this.request('POST', `/repos/${this.fullName}/labels`, labelData);
  }

  /**
   * List the labels for the repository
   * @see https://docs.github.com/en/rest/reference/issues#list-labels-for-a-repository
   * @param {Object} options - filtering options
   */
  listRepoLabels(options?: {
    /**
     * default 30, max 100
     */
    per_page: number,
    /**
     * the page to fetch. default 1.
     */
    page: number
  }) {
    return this.request('GET', `/repos/${this.fullName}/labels`, options);
  }

  listRepoLabelsResponse(option?: {
    /**
     * default 30, max 100
     */
    per_page?: number,
    /**
     * the page to fetch. default 1.
     */
    page?: number
  }) {
    return this.http.get(`githubapi/repos/${this.fullName}/labels`, {
      params: option as any,
      observe: 'response'
    });
  }

  listAllRepoLabels(option?: {
    /**
     * default 30, max 100
     */
    per_page?: number,
    /**
     * the page to fetch. default 1.
     */
    page?: number
  }) {
    return this.listRepoLabelsResponse(option).pipe(switchMap(
      resp => {
        const link = resp.headers.get('link');
        if (link) {
          const lastPage = /page=(\d+)&[^<]+; rel="last"/.exec(link)?.[1];
          if (lastPage)
            return concat(
              of(resp.body),
              range(2, +lastPage - 1).pipe(
                map(page => {
                  option.page = page;
                  return this.listRepoLabelsResponse(option).pipe(map(r => r.body))
                })
              )
            )
        }
        return of(resp.body);
      }
    ));
  }
  /**
 * List the labels for the issue
 * @see https://docs.github.com/en/rest/reference/issues#list-labels-for-an-issue
 * @param {Object} options - filtering options
 */
  listIssueLabels(id, options: {
    /**
     * default 30, max 100
     */
    per_page: number,
    /**
     * the page to fetch. default 1.
     */
    page: number
  }) {
    return this.request('GET', `/repos/${this.fullName}/issues/${id}/labels`, options);
  }

  /**
   * Removes any previous labels and sets the new labels for an issue.
   * @param id
   * @param labels
   * @returns
   */
  setIssueLabels(id, labels: {labels: string[]}) {
    return this.request('PUT', `/repos/${this.fullName}/issues/${id}/labels`, labels);

  }

  /**
   * Get a label
   * @see https://docs.github.com/en/rest/reference/issues#get-a-label
   * @param {string} label - the name of the label to fetch
   */
  getLabel(label) {
    return this.request('GET', `/repos/${this.fullName}/labels/${label}`);
  }

  /**
   * Edit a label
   * @see https://docs.github.com/en/rest/reference/issues#update-a-label
   * @param {string} label - the name of the label to edit
   * @param {Object} labelData - the updates to make to the label
   */
  editLabel(label, labelData: { new_name: string, description: string, /**hex without #*/color: string }) {
    return this.request('PATCH', `/repos/${this.fullName}/labels/${label}`, labelData);
  }

  /**
   * Delete a label
   * @see https://docs.github.com/en/rest/reference/issues#delete-a-label
   * @param {string} label - the name of the label to delete
   */
  deleteLabel(label: string) {
    return this.request('DELETE', `/repos/${this.fullName}/labels/${label}`);
  }
}
