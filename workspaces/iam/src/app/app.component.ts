import { Component } from '@angular/core';
import { UpdateService } from 'core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private _updateService: UpdateService
  ) {
    if (environment.production) {
      this._updateService.checkForUpdate();
    }
  }
}
