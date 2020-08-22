import { isNil } from 'lodash';
import { ApolloServer } from 'apollo-server-lambda';
import { makeContext } from './make-context';
import { makeSchema } from './make-schema';
import { makeMongoDbConnection } from '../libs/make-mongodb-connection';
import { getParameters } from '../utils/get-parameters';

let apolloServer = null;
const makeApolloServer = async (): Promise<ApolloServer> => {
  const { MONGO_DB_URL } = await getParameters();

  const dbConnection = await makeMongoDbConnection(MONGO_DB_URL);

  if (!isNil(apolloServer)) {
    return apolloServer;
  }

  const schema = await makeSchema();

  apolloServer = new ApolloServer({
    schema,
    context: async ({ event }) => makeContext({ event, dbConnection })
  });

  return apolloServer;
};

export { makeApolloServer };
