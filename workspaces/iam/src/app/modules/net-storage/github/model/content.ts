import { Link } from './link';

export interface Content {
    // name: string;
    // path: string;
    sha: string; // 95b966ae1c166bd92f8ae7d1c313e738c731dfc3
    // size: number;
    // url: string; // https://api.github.com/repos/octocat/Hello-World/contents/notes/hello.txt
    // html_url: string;
    // git_url: string;
    // download_url: string;
    // type: string; // file, symlink, submodule, dir
    // _link: Link;
    // submodule_git_url?: string; // only when type is submodule, "git://github.com/jquery/qunit.git"
    content?: string; // encoded; only when type is file
    // target?: string; // path to symlink; only when target is symlink
}
