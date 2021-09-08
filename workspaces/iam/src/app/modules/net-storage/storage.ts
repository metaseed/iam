import { Observable } from 'rxjs';
import { Repository } from './github/repository';
export interface IStorage {
    newPost(name: string): Observable<Repository>;
    delPost(id: string): Observable<Repository>;
}
