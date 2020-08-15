import { omit } from 'lodash';

export interface Context {}

const makeContext = ({ context, dbConnection }): Context => {
  return { ...context, db: omit(dbConnection, ['host', 'port', 'user', 'pass', 'name', 'db']) };
};

export { makeContext };
