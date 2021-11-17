import { APP_BASE_HREF } from "@angular/common";
import { Inject, Injectable, isDevMode } from "@angular/core";

@Injectable()
export class gitHubCacheUtil {

    constructor(@Inject(APP_BASE_HREF) private baseHref) {
    }

  getContentUrl(issueNum, sanitizedTitle) {
    const baseUrl = isDevMode() ?'https://metaseed.github.io/iam/': `${location.origin}${this.baseHref}`
    return `${baseUrl}doc?id=${issueNum}&title=${encodeURIComponent(sanitizedTitle)}`;
  }
}
