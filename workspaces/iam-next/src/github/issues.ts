// Port of net-storage/github `Issue` (the parts the app uses). Issues hold the doc meta; a closed issue is a deleted doc.
import type { Http, RequestOptions } from '../lib/http.ts';

export interface Label {
	id?: number;
	name: string;
	color?: string;
	description?: string;
	default?: boolean;
}

export interface Issue {
	id: number;
	number: number;
	state: 'open' | 'closed';
	title: string;
	body: string | null;
	labels: Label[];
	/** null while open. */
	closed_at: string | null;
	created_at: string;
	updated_at: string;
}

export interface IssueData {
	title?: string;
	body?: string;
	labels?: string[];
}
export interface EditIssueParams extends IssueData {
	state?: 'open' | 'closed';
}
export interface IssueListOption {
	state?: 'open' | 'closed' | 'all';
	labels?: string;
	sort?: 'created' | 'updated' | 'comments';
	direction?: 'asc' | 'desc';
	since?: string;
	per_page?: number;
	page?: number;
}

type Opts = Pick<RequestOptions, 'signal' | 'timeout' | 'retry'>;

export class IssuesApi {
	constructor(
		private readonly http: Http,
		private readonly fullName: string,
	) {}

	private get base() {
		return `/repos/${this.fullName}/issues`;
	}

	// https://docs.github.com/en/rest/issues/issues#list-repository-issues
	list(options: IssueListOption = {}, o: Opts = {}): Promise<Issue[]> {
		return this.http.get(this.base, { ...o, params: { ...options } });
	}

	// https://docs.github.com/en/rest/issues/issues#get-an-issue
	get(number: number, o: Opts = {}): Promise<Issue> {
		return this.http.get(`${this.base}/${number}`, o);
	}

	// https://docs.github.com/en/rest/issues/issues#create-an-issue (writes are not retried)
	create(data: IssueData, o: Opts = {}): Promise<Issue> {
		return this.http.post(this.base, data, { retry: false, ...o });
	}

	// https://docs.github.com/en/rest/issues/issues#update-an-issue
	edit(number: number, params: EditIssueParams, o: Opts = {}): Promise<Issue> {
		return this.http.patch(`${this.base}/${number}`, params, { retry: false, ...o });
	}
}
