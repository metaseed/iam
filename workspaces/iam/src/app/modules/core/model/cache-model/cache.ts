import { Observable } from "rxjs";

export enum DataTables {
  DocumentMeta = 'documents'
}

export interface ICache {
  // read<T>(dataId:string, context: any): Observable<T>;
  readDocMetaByPage(pageIndex:number, pageSize:number):Observable<any>;
  init(nextLevelCache:ICache):void;
  // write<T>(dataId:string,context:any):Observable<T>;

}


