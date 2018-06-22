import { NgModule, ModuleWithProviders } from '@angular/core';
import { CoreModule } from 'core';
import { DBSchema, Database, DatabaseBackend, getIDBFactory, IDB_SCHEMA } from './database-engine';
import { schema } from './schema';



@NgModule({
  providers: [Database, { provide: DatabaseBackend, useFactory: getIDBFactory }]
})
export class DatabaseModule {
  static provideDB(schema: DBSchema): ModuleWithProviders {
    return {
      ngModule: DatabaseModule,
      providers: [{ provide: IDB_SCHEMA, useValue: schema }]
    };
  }
}


