import { Router } from '@angular/router';
import { Location } from '@angular/common';

export class gitHubCacheUtil {
  constructor() {}

  getContentUrl(issueNum, title) {
    return `https://metaseed.github.io/iam/doc?id=${issueNum}&title=${encodeURIComponent(title)}`;
  }
}
