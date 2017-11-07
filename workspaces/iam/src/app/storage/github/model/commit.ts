export interface Commit {
    sha: string;
    url: string;
    html_url: string;
    author: {
        date: string;
        name: string;
        email: string;
    };
    committer: {
        date: string;
        name: string;
        email: string;
    };
    message: string;
    tree: {
        url: string;
        sha: string;
    };
    parents: [
        {
            url: string;
            html_url: string;
            sha: string;
        }
    ];
}
