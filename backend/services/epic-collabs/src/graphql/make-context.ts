import { omit } from 'lodash';

const makeContext = ({ context, dbConnection }) => {
  return { ...context, db: omit(dbConnection, ['host', 'port', 'user', 'pass', 'name', 'db']) };
};

export { makeContext };
