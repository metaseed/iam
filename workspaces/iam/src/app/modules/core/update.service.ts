
import { Component, OnInit, Injectable } from '@angular/core';
import { WindowRef } from './window-ref';
import { SwUpdate } from '@angular/service-worker';
import { MdcSnackbar } from '@angular-mdc/web';

@Injectable()
export class UpdateService {

    constructor(private swUpdate: SwUpdate, public snackBar: MdcSnackbar, private winRef: WindowRef) {

        this.swUpdate.available.subscribe(event => {

            console.log('[App] Update available: current version is', event.current, 'available version is', event.available);
            let snackBarRef = this.snackBar.show('Newer version of the app is available', 'Refresh', {
                timeout: 6,
                actionHandler: () => this.winRef.nativeWindow.location.reload()
            });
        });

        this.swUpdate.activated.subscribe(event => {
            console.log('[App] Update activated: old version was', event.previous, 'new version is', event.current);
        });

    }

    checkForUpdate() {
        console.log('[App] checkForUpdate started')
        this.swUpdate.checkForUpdate()
            .then(() => {
                console.log('[App] checkForUpdate completed')
            })
            .catch(err => {
                console.error(err);
            })
    }

    activateUpdate() {
        console.log('[App] activateUpdate started')
        this.swUpdate.activateUpdate()
            .then(() => {
                console.log('[App] activateUpdate completed')
                this.winRef.nativeWindow.location.reload()
            })
            .catch(err => {
                console.error(err);
            })
    }


}

