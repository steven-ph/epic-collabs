import { promisify } from 'util';
import { makeApolloServer } from './make-apollo-server';

const handler = async (event, context) => {
  if (!event) {
    throw new Error('No lambda event detected');
  }

  context.callbackWaitsForEmptyEventLoop = false;

  const server = await makeApolloServer();

  const apolloHandler = promisify(
    server.createHandler({
      cors: {
        origin: '*',
        methods: 'OPTIONS,POST',
        allowedHeaders: 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent',
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
