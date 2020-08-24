import { get } from 'lodash';

const mockGetParameters = jest.fn();
jest.mock('../../../utils/get-parameters', () => ({
  getParameters: mockGetParameters
}));

import { getJwksClient } from '../get-jwks-client';

describe('getJwksClient', () => {
  beforeEach(() => getJwksClient.cache.clear());

  it('should throw if a jwks uri is not provided', () => {
    mockGetParameters.mockResolvedValue({
      AUTH0_JWKS_ENDPOINT: null
    });

    return expect(getJwksClient()).rejects.toThrow('Jwks Uri is required');
  });

  it('should always get a cached copy of the jwksClient', async () => {
    mockGetParameters.mockResolvedValue({
      AUTH0_JWKS_ENDPOINT: 'https://auth0.com/.well-known/jwks.json'
    });

    const client = await getJwksClient();
    const client2 = await getJwksClient();

    expect(client).toBe(client2);
    expect(get(client, 'options.jwksUri')).toEqual('https://auth0.com/.well-known/jwks.json');
  });
});
