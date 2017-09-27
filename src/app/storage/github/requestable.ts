import { Http, RequestOptions, Headers, RequestMethod } from '@angular/http';
import { UserInfo } from './index';
import { Const } from './const';

class Requestable {
    private _authorizationHeader: string;

    constructor(private _userInfo: UserInfo, private _acceptHeader: string = 'V3', private _apiBase = Const.apiBase) {
        if (_userInfo.token) {
            this._authorizationHeader = 'token ' + _userInfo.token;
        } else {
            this._authorizationHeader = 'Basic ' + btoa(this._userInfo.name + ':' + this._userInfo.password);
        }
    }

    request(method: RequestMethod, path: string, data: any) {
    }

    private getRequestHeader(acceptHeader: string, isRaw: boolean): Headers {
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/vnd.github.' + (acceptHeader || this._acceptHeader) + isRaw ? '.raw+json' : '+json');
        // headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Content-Type', 'application/json;charset=UTF-8');
        if (this._authorizationHeader) {
            headers.append('Authorization', this._authorizationHeader);
        }
        return headers;
    }

    private getURL(path) {
        let url = path;

        if (path.indexOf('//') === -1) {
            url = this._apiBase + path;
        }

        const newCacheBuster = 'timestamp=' + new Date().getTime();
        return url.replace(/(timestamp=\d+)/, newCacheBuster);
    }

}
