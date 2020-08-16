import { get } from 'lodash';

import { ApolloServer } from 'apollo-server-lambda';
import { makeContext } from './make-context';
import { makeSchema } from './make-schema';
import { makeMongoDbConnection } from './make-mongodb-connection';
import { getParameters } from '../utils/get-parameters';

const getViewer = ({ event }) => {
  const authorizer = get(event, 'requestContext.authorizer') || {};
  return {
    id: get(authorizer, 'principalId')
  };
};

let apolloServer = null;
const makeApolloServer = async (): Promise<ApolloServer> => {
  const { MONGO_DB_URL } = await getParameters();

  const dbConnection = await makeMongoDbConnection(MONGO_DB_URL);

  if (apolloServer) {
    return apolloServer;
  }

  const schema = await makeSchema();

  apolloServer = new ApolloServer({
    schema,
    context: async ({ event, context }) => {
      const viewer = getViewer({ event });

      const ctx = {
        headers: get(event, 'headers'),
        viewer,
        ...context
      };

      return makeContext({ context: ctx, dbConnection });
    }
  });

  return apolloServer;
};

export { makeApolloServer };
