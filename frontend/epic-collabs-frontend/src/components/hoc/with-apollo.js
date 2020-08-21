import cookie from 'cookie';
import { get } from 'lodash';
import fetch from 'cross-fetch';
import { getConfig } from 'config';
import { setContext } from '@apollo/client/link/context';
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { withApollo as _withApollo } from 'libs/apollo';

const isServer = typeof window === 'undefined';

const { GRAPHQL_ENDPOINT } = getConfig();

const getToken = headers => {
  const cookies = get(isServer ? headers : document, 'cookie', '');

  return get(cookie.parse(cookies), 'a0:session', '');
};

const attachAuth = headers => () => {
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
    link: ApolloLink.from([authLink(), httpLink]),
    cache: new InMemoryCache().restore(initialState)
  });
};

const withApollo = _withApollo(createApolloClient);

export { withApollo };
