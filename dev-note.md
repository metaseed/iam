## decision to not contain title in file name, just use id:
1. doc history is lost if title changed (delete/create file). although we can use the `move` implementation api in github-repo.ts, but it generate multiple communication with server.
2. if modify title, with title in file name we need to: rename(delete/create) file in repo, update meta(if update failed, we lost the link we the file)
3. if modify tile, url for this file is changed. then the old url shared to someone would not work.

4. keep format in file name and url, and make sure the file format could only be set when file create.
5. we keep the title and version info in commit message
6. if save explicitly, let user input note of the changes and save it in commit msg, we could list file history for that with change note by default.
    test file location, ver: 1.2.3, change: change note
7. keep file name in url, but do not use it to locate file

## relationship between DocMeta and DocContent
1. DocContent do not rely on DocMeta
1. part of DocMeta's content come from DocContent
1. DocContent could be accessed via url or from click on DocMeta, the parameter: id and format