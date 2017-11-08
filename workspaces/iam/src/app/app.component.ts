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
  title = 'app';
  constructor(private _http: HttpClient) {

  }
  ngOnInit() {
    let storage = new GithubStorage(this._http, new UserInfo('metasong', 'metaseed@gmail.com', 'mssong179'));
    storage.repos('test2').subscribe(
      (repo: Repository) => {
        // console.log(repo);
        // repo.file('test010a8322.md', 'aafabaa7777778744o7acaaaaaa' + Date.now()).subscribe((file) => {
        //   // repo.delPost('test00').subscribe();
        //   const f = file;
        //   console.log(f);
        // });
        // repo.issue.create({
        //   title: 'title',
        //   body: 'body',
        //   labels: ['a', 'b']
        // }).subscribe((is) => {
        //   console.log(is);
        // });
        let i = repo.issue.list().subscribe(is => console.log(is));
      },
      (error) => console.log(error)
    );
  }
  private markdown = `


`;
}
