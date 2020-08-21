import fetch from 'cross-fetch';
import { getConfig } from 'config';
import { get, isEmpty } from 'lodash';
import { getAuth0Client } from 'libs/auth0';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';

let accessToken = '';
let cachedClient = null;
const auth0 = getAuth0Client();
const { GRAPHQL_ENDPOINT } = getConfig();

const getAccessToken = async ctx => {
  const inAppContext = Boolean(ctx.ctx);

  if (inAppContext) {
    try {
      const req = get(ctx, 'ctx.req');
      const res = get(ctx, 'ctx.res');

      const tokenCache = auth0.tokenCache(req, res);
      const data = await tokenCache.getAccessToken();

      return get(data, 'accessToken') || '';
      // eslint-disable-next-line
    } catch (error) {
      return '';
    }
  }

  if (!isEmpty(accessToken)) {
    return accessToken;
  }

  try {
    const res = await fetch('/api/session');

    if (res.ok) {
      const json = await res.json();
      accessToken = get(json, 'accessToken', '');
    }
  } catch (error) {
    accessToken = '';
  }

  return accessToken;
};

// return the headers to the context so httpLink can read them
const attachAuth = ctx => async () => {
  const accessToken = await getAccessToken(ctx);

  return {
    headers: {
      authorization: `Bearer ${accessToken}`
    }
  };
};

const makeAuthLink = ctx => setContext(attachAuth(ctx));

const httpLink = new HttpLink({
  credentials: 'same-origin',
  uri: GRAPHQL_ENDPOINT,
  fetch
});

// remove cached token on 401 from the server
const errorLink = onError(({ networkError }) => {
  const errorName = get(networkError, 'name');
  const statusCode = get(networkError, 'statusCode');

  if (errorName === 'ServerError' && statusCode === 401) {
    accessToken = '';
  }
});

const createApolloClient = ({ initialState, ctx }) => {
  accessToken = '';

  return new ApolloClient({
    connectToDevTools: typeof window !== 'undefined' && process.env.NODE_ENV !== 'production',
    ssrMode: Boolean(ctx),
    link: ApolloLink.from([errorLink, makeAuthLink(ctx), httpLink]),
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
