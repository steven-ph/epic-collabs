const mockVerifyToken = jest.fn(token => token);

import jwt from 'jsonwebtoken';
jwt.verify = mockVerifyToken;

const mockGetPublicKey = jest.fn().mockResolvedValue('publicKey');
const mockGetSecret = jest.fn().mockResolvedValue('secret');

import { makeValidateToken } from './make-validate-token';
const validateToken = makeValidateToken({
  getPublicKey: mockGetPublicKey,
  getSecret: mockGetSecret
});

const HS256_JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ0ZXN0LWF1ZCIsInN1YiI6IjEyMzQ1Njc4OTAiLCJuYW1lIjoiSm9obiBEb2UiLCJhZG1pbiI6dHJ1ZX0.WLexfxZaABI5ojbxFc-Hed_NGKLMJTq_UpbV9B93_P4';
const RS256_JWT_TOKEN =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImFjZy1raWQifQ.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.U7cJXzNaTSQJZ6_SI0ep0uRvlFV_6z_u0ygsTUySG5E0cXrryara-TjkPKq_LDUYyAoO_MJ2tMLOvOwb5AgjKaUyLcWw2IV9nmkky9LJ7GGRNpG1ffMyvZ8QSxfglv2vTPZlB9WP593f7jfLdqfhy0olYnAPfkfJUMJua7vTCOLrNERnXBxxuG-uebZ_IsZz89kOom4sThI_PaPM_4rgl3Hg1BvEaBhQfh0xk3dKD0pEMzqDHEYLLj1P8ZDNtTdS3uuMsce_-ZcA0XXu9Cq9CXhMRy4AwPCWfmLRZOXQgxGSFudBLUXuXAK2EuV76nGarrUF1M1gOW1QXjClTnNHsA';

describe('validateToken', () => {
  beforeEach(() => {
    mockVerifyToken.mockClear();
  });

  it('should throw if the token cannot be decoded', () => {
    return expect(validateToken({ jwtToken: 'hello' })).rejects.toThrow('Could not decode user token');
  });

  it('should verify the token with a public key if the alg is RS256', async () => {
    await validateToken({ jwtToken: RS256_JWT_TOKEN });

    expect(mockGetPublicKey).toBeCalledWith({ kid: 'acg-kid' });
    expect(mockVerifyToken).toHaveBeenCalledWith(
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImFjZy1raWQifQ.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.U7cJXzNaTSQJZ6_SI0ep0uRvlFV_6z_u0ygsTUySG5E0cXrryara-TjkPKq_LDUYyAoO_MJ2tMLOvOwb5AgjKaUyLcWw2IV9nmkky9LJ7GGRNpG1ffMyvZ8QSxfglv2vTPZlB9WP593f7jfLdqfhy0olYnAPfkfJUMJua7vTCOLrNERnXBxxuG-uebZ_IsZz89kOom4sThI_PaPM_4rgl3Hg1BvEaBhQfh0xk3dKD0pEMzqDHEYLLj1P8ZDNtTdS3uuMsce_-ZcA0XXu9Cq9CXhMRy4AwPCWfmLRZOXQgxGSFudBLUXuXAK2EuV76nGarrUF1M1gOW1QXjClTnNHsA',
      'publicKey'
    );
  });

  it('should fallback to verifying token with the secret if the alg is not RS256', async () => {
    await validateToken({ jwtToken: HS256_JWT_TOKEN });

    expect(mockVerifyToken).toHaveBeenCalledWith(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ0ZXN0LWF1ZCIsInN1YiI6IjEyMzQ1Njc4OTAiLCJuYW1lIjoiSm9obiBEb2UiLCJhZG1pbiI6dHJ1ZX0.WLexfxZaABI5ojbxFc-Hed_NGKLMJTq_UpbV9B93_P4',
      'secret'
    );
  });
});
