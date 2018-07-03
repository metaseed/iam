import { NgModule, ModuleWithProviders } from '@angular/core';
import { CoreModule } from 'core';
import { DBSchema, Database, DatabaseBackend, getIDBFactory, IDB_SCHEMA } from './database-engine';
import { schema as dbSchema } from './schema';
import { DatabaseCache } from './database-cache';

@NgModule({
  providers: [Database, DatabaseCache,{ provide: IDB_SCHEMA, useValue: dbSchema }, { provide: DatabaseBackend, useFactory: getIDBFactory }]
})
export class DatabaseModule {

}
