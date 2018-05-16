import { DBSchema } from './database';

export const schema: DBSchema = {
  version: 1,
  name: 'iam_db',
  stores: {
    documents: {
      autoIncrement: true,
      primaryKey: 'id',
    },
  },
};
