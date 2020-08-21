import fetch from 'cross-fetch';
import { HttpLink } from '@apollo/client';
import { getConfig } from 'config';

const { GRAPHQL_ENDPOINT } = getConfig();

const httpLink = new HttpLink({
  credentials: 'same-origin',
  uri: GRAPHQL_ENDPOINT,
  fetch
});

export { httpLink };
