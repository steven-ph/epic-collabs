import { ApolloServer } from 'apollo-server-lambda';
import { makeContext } from './make-context';
import { makeSchema } from './make-schema';
import { makeMongoDbConnection } from './make-mongodb-connection';
import { getParameters } from '../utils/get-parameters';

let apolloServer = null;
const makeApolloServer = async (): Promise<ApolloServer> => {
  const { MONGODB_URL } = await getParameters();
  console.log(MONGODB_URL);
  const dbConnection = await makeMongoDbConnection(MONGODB_URL);

  if (apolloServer) {
    return apolloServer;
  }

  const schema = await makeSchema();

  apolloServer = new ApolloServer({
    schema,
    context: context => makeContext({ context, dbConnection })
  });

  return apolloServer;
};

export { makeApolloServer };
