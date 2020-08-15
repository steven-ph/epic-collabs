import { ApolloServer } from 'apollo-server-lambda';
import { makeContext } from './make-context';
import { makeSchema } from './make-schema';
import { makeMongoDbConnection } from './make-mongodb-connection';

let apolloServer = null;
const makeApolloServer = async (): Promise<ApolloServer> => {
  const dbConnection = await makeMongoDbConnection();

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
