import withApollo from 'nextjs-with-apollo';
import fetch from 'isomorphic-unfetch';
import { getConfig } from 'config/get-config';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import cookie from 'cookie';
import get from 'lodash/get';

const isServer = typeof window === 'undefined';

const { GRAPHQL_ENDPOINT, BUILD_NUMBER, STAGE } = getConfig();

const getToken = headers => {
  const cookies = get(isServer ? headers : document, 'cookie', '');

  return get(cookie.parse(cookies), 'auth0_token', '');
};

const attachAuth = headers => async () => {
  const token = getToken(headers);

  return {
    headers: {
      authorization: `Bearer ${token}`,
      'apollographql-client-name': `station-${STAGE}`,
      'apollographql-client-version': `${BUILD_NUMBER}`
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

export { attachAuth };
export default withApollo(createApolloClient);
