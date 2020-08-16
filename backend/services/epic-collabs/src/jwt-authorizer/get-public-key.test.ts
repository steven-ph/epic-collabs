const mockGetSigningKey = jest.fn();

jest.mock('./get-signing-key', () => ({
  getSigningKey: mockGetSigningKey
}));

import { getPublicKey } from './get-public-key';

describe('getPublicKey', () => {
  it('should throw an error when there is no public key', () => {
    mockGetSigningKey.mockResolvedValue({});

    return expect(getPublicKey({ kid: '123' })).rejects.toThrow('Could not get public key');
  });

  it('should return the public signing key', () => {
    mockGetSigningKey.mockResolvedValue({
      publicKey: 'thePublicKey',
      rsaPublicKey: 'theRSAPublicKey'
    });

    return expect(getPublicKey({ kid: '123' })).resolves.toEqual('thePublicKey');
  });

  it('should return the rsaPublicKey is a publicKey is not found', () => {
    mockGetSigningKey.mockResolvedValue({
      rsaPublicKey: 'theRSAPublicKey'
    });

    return expect(getPublicKey({ kid: '123' })).resolves.toEqual('theRSAPublicKey');
  });
});
