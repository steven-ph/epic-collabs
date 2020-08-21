import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { makeAuthLink } from './auth-link';
import { httpLink } from './http-link';

let cachedClient = null;

const createApolloClient = ({ initialState, ctx }) => {
  return new ApolloClient({
    connectToDevTools: typeof window !== 'undefined' && process.env.NODE_ENV !== 'production',
    ssrMode: Boolean(ctx),
    link: ApolloLink.from([makeAuthLink(ctx), httpLink]),
    cache: new InMemoryCache().restore(initialState)
  });
};

const initApolloClient = ({ initialState, ctx }) => {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections
  if (typeof window === 'undefined') {
    return createApolloClient({ initialState, ctx });
  }

  // Reuse client on the client-side
  if (!cachedClient) {
    cachedClient = createApolloClient({ initialState, ctx });
  }

  return cachedClient;
};

export { initApolloClient };
