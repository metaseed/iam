import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Repository, } from './storage/github/index';
import { GithubStorage } from './storage/github/github';
import { UserInfo } from './storage/github/user-info';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Iam';
  constructor(private _http: HttpClient) {

  }
  ngOnInit() {

  }
  private markdown = '';
}
