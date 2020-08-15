import { ApolloServer } from 'apollo-server-lambda';
import { makeContext } from './make-context';
import { makeSchema } from './make-schema';

let apolloServer = null;

const makeApolloServer = async (): Promise<ApolloServer> => {
  if (apolloServer) {
    return apolloServer;
  }

  const schema = await makeSchema();

  apolloServer = new ApolloServer({
    schema,
    context: makeContext
  });

  return apolloServer;
};

export { makeApolloServer };
