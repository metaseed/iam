import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Const } from './model/const';
import { AuthService } from './auth.service';
import { Media } from './media';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private apiBase = Const.apiBase;

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url.startsWith('githubapi')) {
      const authToken = this.auth.getToken();

      const authReq = req.clone({
        url: this.getURL(req.url.replace('githubapi','')),
        headers: req.headers
          .set('Authorization', authToken)
          .set('Content-Type', 'application/json;charset=UTF-8')
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }

  private getURL(path): string {
    let url = path;

    if (path.indexOf('//') === -1) {
      url = this.apiBase + path;
    }

    const newCacheBuster = 'timestamp=' + new Date().getTime();
    return url.replace(/(timestamp=\d+)/, newCacheBuster);
  }
}
