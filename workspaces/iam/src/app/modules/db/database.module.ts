import { NgModule } from '@angular/core';
import { CoreModule } from 'core';
import { DBModule } from './database-engine';
import { schema } from './schema';


@NgModule({
  imports: [CoreModule, DBModule.provideDB(schema)],
  exports: [],
  providers: [],
})
export class DatabaseModule { }

