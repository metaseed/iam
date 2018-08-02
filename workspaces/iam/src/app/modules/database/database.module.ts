import { NgModule } from '@angular/core';
import { DB_CACHE_TOKEN } from 'core';
import { Database, DatabaseBackend, getIDBFactory, IDB_SCHEMA } from './database-engine';
import { schema as dbSchema } from './schema';
import { DatabaseCache } from './database-cache';

@NgModule({
  providers: [
    Database,
    { provide: DB_CACHE_TOKEN, useClass: DatabaseCache },
    { provide: IDB_SCHEMA, useValue: dbSchema },
    { provide: DatabaseBackend, useFactory: getIDBFactory }
  ]
})
export class DatabaseModule {}
