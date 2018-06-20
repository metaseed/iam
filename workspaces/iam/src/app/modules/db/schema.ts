import { DBSchema } from './database-engine';

export const schema: DBSchema = {
  version: 1,
  name: 'iam_db',
  stores: {
    documents: {
      autoIncrement: true,
      primaryKey: 'num',
    },
  },
};
