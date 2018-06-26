import { DBSchema } from './database-engine';

export const schema: DBSchema = {
  version: 5,
  name: 'iam_db_cache',
  stores: {
    documents: {
      autoIncrement: true,
      primaryKey: 'number',
    },

  },
};
