import { DBSchema } from './database-engine';

export const schema: DBSchema = {
  version: 1,
  name: 'iam_db_cache',
  stores: {
    document: {
      autoIncrement: true,
      primaryKey: 'key',
    },

    doc_meta: {
      autoIncrement: true,
      primaryKey: 'key',

    }

  },
};
