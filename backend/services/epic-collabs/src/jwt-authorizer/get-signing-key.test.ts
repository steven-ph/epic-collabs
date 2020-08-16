const mockCallbackGetSigningKey = jest.fn((_, cb) => cb(null, { publicKey: 'signingkey' }));

jest.mock('./get-jwks-client', () => ({
  getJwksClient: () =>
    Promise.resolve({
      getSigningKey: mockCallbackGetSigningKey
    })
}));

import { getSigningKey } from './get-signing-key';

describe('getSigningKey', () => {
  it('should get the signing key using kid', () => {
    return expect(getSigningKey({ kid: '123' }))
      .resolves.toEqual({
        publicKey: 'signingkey'
      })
      .then(() => {
        expect(mockCallbackGetSigningKey.mock.calls[0][0]).toEqual('123');
      });
  });
});
