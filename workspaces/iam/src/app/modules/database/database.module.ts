import { NgModule } from '@angular/core';
import { Database, DatabaseBackend, getIDBFactory, IDB_SCHEMA } from './database-engine';
import { schema as dbSchema } from './schema';

@NgModule({
  providers: [
    Database,
    { provide: IDB_SCHEMA, useValue: dbSchema },
    { provide: DatabaseBackend, useFactory: getIDBFactory }
  ]
})
export class DatabaseModule {}
