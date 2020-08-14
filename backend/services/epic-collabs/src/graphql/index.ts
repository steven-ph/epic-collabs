import { promisify } from 'util';
import { makeApolloServer } from './make-server';

const handler = async (event, context) => {
  const server = await makeApolloServer();

  const apolloHandler = promisify(
    server.createHandler({
      cors: {
        origin: '*',
        credentials: true
      }
    })
  );

  try {
    return await apolloHandler(event, context);
  } catch (e) {
    throw e;
  }
};

export { handler };
