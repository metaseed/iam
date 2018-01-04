import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Repository, } from './storage/github/index';
import { GithubStorage } from './storage/github/github';
import { UserInfo } from './storage/github/user-info';
import { UpdateService } from 'core';
import { environment } from '../environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = "I'm";
  constructor(private _http: HttpClient, private _updateService: UpdateService) {
    if (environment.production) {
      this._updateService.checkForUpdate();
    }
  }
  ngOnInit() {

  }
  private markdown = '';
}
