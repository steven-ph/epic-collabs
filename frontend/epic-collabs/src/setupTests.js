/* eslint-disable no-console */
import 'core-js';
import '@testing-library/jest-dom/extend-expect';

global.beforeEach(() => jest.clearAllMocks());

jest.mock('config', () => ({
  getConfig: () => ({
    AUTH0_CLIENT_ID: 'AUTH0_CLIENT_ID',
    AUTH0_DOMAIN: 'AUTH0_DOMAIN',
    AUTH0_REDIRECT_URL: 'AUTH0_REDIRECT_URL',
    AUTH0_AUDIENCE: 'AUTH0_AUDIENCE',
    GRAPHQL_ENDPOINT: 'GRAPHQL_ENDPOINT',
  }),
}));
