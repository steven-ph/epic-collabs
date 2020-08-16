import { pick } from 'lodash';

const makeContext = ({ context, dbConnection }) => {
  return { ...context, db: pick(dbConnection, ['models']) };
};

export { makeContext };
