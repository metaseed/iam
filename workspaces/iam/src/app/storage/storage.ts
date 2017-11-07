import { Observable } from 'rxjs';
import { Repository } from './github/repository';
export interface IStorage {
    /**
     * return post id.
     */
    newPost(name: string): Observable<Repository>;
    delPost(id: string): Observable<Repository>;

}
