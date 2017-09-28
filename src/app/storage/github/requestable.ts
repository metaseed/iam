import { Http, RequestOptions, Headers, RequestMethod, Request, ResponseContentType } from '@angular/http';
import { UserInfo } from './index';
import { Const } from './const';

const METHODS_WITH_NO_BODY = ['GET', 'HEAD', 'DELETE'];
export class Requestable {
    private _authorizationHeader: string;

    constructor(protected _http: Http, protected _userInfo: UserInfo,
        private _acceptHeader: string = 'V3', private _apiBase = Const.apiBase) {
        if (_userInfo.token) {
            this._authorizationHeader = 'token ' + _userInfo.token;
        } else {
            this._authorizationHeader = 'Basic ' + btoa(this._userInfo.name + ':' + this._userInfo.password);
        }
    }

    request(method: RequestMethod, path: string, data: any = null, acceptHeader: string = '', isRaw: boolean = false) {
        const url = this.getURL(path);
        const headers = this.getRequestHeader(acceptHeader, isRaw);
        const shouldUseDataAsParams = data && (typeof data === 'object') && this.methodHasNoBody(method);
        const request = new Request({
            url: url,
            method: method,
            headers: headers,
            // withCredentials: true,
            body: shouldUseDataAsParams ? undefined : data,
            params: shouldUseDataAsParams ? data : undefined,
            responseType: isRaw ? ResponseContentType.Text : ResponseContentType.Json
        });
        return this._http.request(request);
    }

    private methodHasNoBody(method) {
        return METHODS_WITH_NO_BODY.indexOf(method) !== -1;
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

    private getURL(path): string {
        let url = path;

        if (path.indexOf('//') === -1) {
            url = this._apiBase + path;
        }

        const newCacheBuster = 'timestamp=' + new Date().getTime();
        return url.replace(/(timestamp=\d+)/, newCacheBuster);
    }

}
