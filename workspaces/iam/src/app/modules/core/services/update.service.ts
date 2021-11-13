import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, first, interval, map } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MSG_DISPLAY_TIMEOUT } from 'core';
import { concat } from 'rxjs';

@Injectable()
export class UpdateService {
  constructor(appRef: ApplicationRef, private swUpdate: SwUpdate, public snackBar: MatSnackBar) {
    const appIsStable$ = appRef.isStable.pipe(first(isStable => isStable === true));
    // check update every hour
    const everyOneHour$ = interval(1000 * 60 * 60);
    concat(appIsStable$, everyOneHour$).subscribe(() => this.checkForUpdate());

    this.swUpdate.versionUpdates.pipe(
      filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
      .subscribe(event => {
        console.log(
          '[App] Update available: current version is',
          event.currentVersion,
          'available version is',
          event.latestVersion
        );
        const snackBarRef = this.snackBar.open(`Newer version of the app is available: ${event.latestVersion} -> ${event.latestVersion}`, 'update', {
          duration: MSG_DISPLAY_TIMEOUT * 3
        });
        snackBarRef.onAction().subscribe(() => this.activateUpdate());
      });

    this.swUpdate.unrecoverable.subscribe(event => {
      const snackBarRef = this.snackBar.open(
        'An error occurred that we cannot recover from:\n' +
        event.reason +
        '\n\nPlease reload the page.', 'reload'
      );
      snackBarRef.onAction().subscribe(() => {
        location.reload();
      })
    });
  }

  /**
   * Asking the service worker to check the server for new updates.
   */
  checkForUpdate() {
    console.log('[App] checkForUpdate started');
    this.swUpdate
      .checkForUpdate()
      .then(() => {
        console.log('[App] checkForUpdate completed');
      })
      .catch(err => {
        console.error(err);
      });
  }

  /**
   * Asking the service worker to activate the latest version of the app for the current tab.
   */
  activateUpdate() {
    console.log('[App] activateUpdate started');
    this.swUpdate
      .activateUpdate()
      .then(() => {
        console.log('[App] activateUpdate completed');
        location.reload();
      })
      .catch(err => {
        console.error(err);
      });
  }
}
