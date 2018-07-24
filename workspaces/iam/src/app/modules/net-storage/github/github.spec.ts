import { UserInfo, GithubStorage, Repository } from '.';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { File } from './model/file';

describe('create repo', () => {
    let storage: GithubStorage;

    beforeAll(() => {
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                { provide: UserInfo, useValue: new UserInfo('metasong', 'metaseed@gmail.com', 'mssong179') },
                GithubStorage,
            ]
        });
    });

    it('should create repository create and delete file', () => {
        storage = TestBed.get(GithubStorage);
        storage.init('test2').subscribe(
            (repo: Repository) => {
                console.log(repo);
                repo.file('test010a83', 'aafabaa7777778744o7acaaaaaa' + Date.now()).subscribe((file) => {
                    // repo.delPost('test00').subscribe();
                    const f = <File>file;
                    console.log(f);
                });
            },
            (error) => console.log(error)
        );
        expect(true === true);
    });
});
