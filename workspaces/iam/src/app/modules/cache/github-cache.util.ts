import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Injectable } from "@angular/core";

@Injectable()
export class gitHubCacheUtil {
  constructor() {}

  getContentUrl(issueNum, sanitizedTitle) {
    return `https://metaseed.github.io/iam/doc?id=${issueNum}&title=${encodeURIComponent(sanitizedTitle)}`;
  }
}
