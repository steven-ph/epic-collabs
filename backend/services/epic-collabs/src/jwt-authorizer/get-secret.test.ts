const mockGetParameters = jest.fn();
jest.mock('../utils/get-parameters', () => ({
  getParameters: mockGetParameters
}));

import { getSecret } from './get-secret';

describe('getSecret', () => {
  it('should get the secret for the specified audience', () => {
    mockGetParameters.mockResolvedValueOnce({
      AUTH0_SECRET: 'eyJkZXNrdG9wQ2xpZW50IjoiZGVza3RvcFNlY3JldCIsIm1vYmlsZUNsaWVudCI6Im1vYmlsZVNlY3JldCJ9'
    });

    return expect(getSecret({ audience: 'desktopClient' })).resolves.toEqual('desktopSecret');
  });

  it('should throw an error is a secret is not found for an audience', () => {
    mockGetParameters.mockResolvedValueOnce({
      AUTH0_SECRET: 'invalidMap'
    });

    return expect(getSecret({ audience: 'nonExistantClient' })).rejects.toThrow('Unable to get secret');
  });

  it('should throw an error when the secrets map cannot be decoded', () => {
    mockGetParameters.mockResolvedValueOnce({
      AUTH0_SECRET: 'invalidMap'
    });

    return expect(getSecret({ audience: 'desktopClient' })).rejects.toThrow('Unable to get secret');
  });
});
