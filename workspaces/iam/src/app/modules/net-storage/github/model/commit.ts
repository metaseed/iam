export interface Commit {
  message: string;
  sha: string;
  url: string;
  html_url: string;
  comments_url: string,
  node_id: string;
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
  commit: {
    author: { date: string, name: string, email: string },
    committer: { date: string, name: string, email: string },
    message: string,
    tree: { sha: string, url: string },
    url: string,
    verification: { reason: string, verified: boolean }
  },
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
