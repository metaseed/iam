import { OnDestroy } from '@angular/core';
export declare class SpinnerComponent implements OnDestroy {
    visible: boolean;
    timeout: any;
    baseClass: string;
    childClass: string;
    numItems: number;
    delay: number;
    color: string;
    isRunning: boolean;
    private cancel();
    readonly items: any[];
    ngOnDestroy(): any;
}
export declare const SpinnerTemplate = "\n  <div [hidden]=\"!visible\" [ngClass]=\"baseClass\">\n      <div *ngFor=\"let item of items; let i = index\" [ngClass]=\"childClass + (i+1)\" [style.backgroundColor]=\"color\"></div>\n  </div>\n";
