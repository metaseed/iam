import { HttpClient, HttpHeaders, HttpRequest, HttpResponse, HttpResponseBase, HttpParams } from '@angular/common/http';
import { UserInfo } from './index';
import { Const } from './model/const';
import { Media } from './media';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
const METHODS_WITH_NO_BODY = ['GET', 'HEAD', 'DELETE'];
export class Requestable {
    private _authorizationHeader: string;

    constructor(protected _http: HttpClient, protected _userInfo: UserInfo,
        private _version: string = 'V3', private _apiBase = Const.apiBase) {
        if (_userInfo.token) {
            this._authorizationHeader = 'token ' + _userInfo.token;
        } else {
            this._authorizationHeader = 'Basic ' + btoa(this._userInfo.name + ':' + this._userInfo.password);
        }
    }

    request(method: string, path: string, data: any = null, media?: string) {
        const url = this.getURL(path);
        const headers = this.getRequestHeader(media);
        const shouldUseDataAsParams = data && (typeof data === 'object') && this.methodHasNoBody(method);
        const request = new HttpRequest(method, url, {
            headers: headers,
            reportProgress: false,
            // withCredentials: true,
            body: shouldUseDataAsParams ? undefined : data,
            params: shouldUseDataAsParams ? new HttpParams(data) : undefined,
            responseType: (media && media.toLowerCase().includes('raw')) ? 'text' : 'json'
        });
        return <Observable<HttpResponse<any>>>this._http.request(request).filter(r => r instanceof HttpResponseBase);
    }

    private methodHasNoBody(method) {
        return METHODS_WITH_NO_BODY.indexOf(method) !== -1;
    }

    private getRequestHeader(media?: string) {
        const header = {
            'Accept': media ? media : Media.default,
            'Content-Type': 'application/json;charset=UTF-8'
        }
        if (this._authorizationHeader) {
            header['Authorization'] = this._authorizationHeader;
        }
        let headers = new HttpHeaders(header);
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
