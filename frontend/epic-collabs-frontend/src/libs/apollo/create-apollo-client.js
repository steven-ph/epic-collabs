import { get } from 'lodash';
import cookie from 'cookie';
import fetch from 'cross-fetch';
import { setContext } from '@apollo/client/link/context';
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache
} from '@apollo/client';
import { getConfig } from 'config';

const { GRAPHQL_ENDPOINT } = getConfig();

const isServer = typeof window === 'undefined';
const isBrowser = typeof window !== 'undefined';

const getToken = headers => {
  const cookies = get(headers, 'cookie', '');

  const token = get(cookie.parse(cookies), 'auth0_token', '');

  return Promise.resolve(token);
};

const attachAuth = headers => async () => {
  const token = getToken(headers);

  return {
    headers: {
      authorization: `Bearer ${token}`
    }
  };
};

const createApolloClient = ({ initialState = {}, headers = {} }) => {
  const authLink = () => setContext(attachAuth(headers));

  const httpLink = new HttpLink({
    credentials: 'same-origin',
    uri: GRAPHQL_ENDPOINT,
    fetch
  });

  return new ApolloClient({
    ssrMode: isServer,
    connectToDevTools: isBrowser && process.env.NODE_ENV !== 'production',
    link: ApolloLink.from([authLink(), httpLink]),
    cache: new InMemoryCache().restore(initialState)
  });
};

export { getToken, createApolloClient };
