import { Injectable } from '@angular/core';
import { MdcSnackbar } from '@angular-mdc/web';

@Injectable()
export class PushService {
    constructor(private snackBar: MdcSnackbar) {
        // https://medium.com/google-developer-experts/a-new-angular-service-worker-creating-automatic-progressive-web-apps-part-2-practice-3221471269a1
    }
}