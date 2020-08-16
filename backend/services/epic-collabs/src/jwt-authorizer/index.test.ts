import { handler } from '.';

const HS256_JWT_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImFjZy1raWQifQ.eyJzdWIiOiJhdXRoMHwkaGVsbG8uZ3JlYXQiLCJhdWQiOiJtb2JpbGVDbGllbnQiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjEwMTYyMzkwMjIsImV4cCI6MTkxNjI0OTAyMiwiaHR0cHM6Ly9ucy5hY2xvdWQuZ3VydS9yb2xlcyI6eyJhZG1pbiI6dHJ1ZSwibWVtYmVyIjp0cnVlfSwiaHR0cHM6Ly9ucy5hY2xvdWQuZ3VydS9vcmdhbmlzYXRpb25JZCI6InRoZU9yZ2FuaXNhdGlvbklkIn0.1M1qJzeAcsYbmnVjDyQpASPCeNV2hWBsuzp0dTys60Q';
const HS256_JWT_TOKEN_EXPIRED =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImFjZy1raWQifQ.eyJzdWIiOiJhdXRoMHwkaGVsbG8uZ3JlYXQiLCJhdWQiOiJtb2JpbGVDbGllbnQiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjEwMTYyMzkwMjIsImV4cCI6MTAxNjI0OTAyMiwiaHR0cHM6Ly9ucy5hY2xvdWQuZ3VydS9yb2xlcyI6eyJhZG1pbiI6dHJ1ZSwibWVtYmVyIjp0cnVlfSwiaHR0cHM6Ly9ucy5hY2xvdWQuZ3VydS9vcmdhbmlzYXRpb25JZCI6InRoZU9yZ2FuaXNhdGlvbklkIn0.fNokMi1HKDF3bx392wcf-c_2FqvUWznakztGOmPwGjg';

const policyDocument = {
  Version: '2012-10-17',
  Statement: [
    {
      Action: 'execute-api:Invoke',
      Effect: 'Allow',
      Resource: 'methodArn'
    }
  ]
};

jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValue('mock-uuid')
}));

jest.mock('../utils/get-parameters', () => ({
  kloudStore: {
    getSecrets: jest.fn().mockResolvedValue({
      AUTH0_SECRET: 'eyJkZXNrdG9wQ2xpZW50IjoiZGVza3RvcFNlY3JldCIsIm1vYmlsZUNsaWVudCI6Im1vYmlsZVNlY3JldCJ9'
    })
  }
}));

describe('jwtAuthorizer', () => {
  describe('when the token is valid', () => {
    let response;

    beforeAll(async () => {
      jest.clearAllMocks();
      const authorizationToken = `Bearer ${HS256_JWT_TOKEN}          `;

      const event = {
        authorizationToken,
        methodArn: 'methodArn'
      };

      response = await handler(event);
    });

    it('should not throw and return a successful response with the policyDocument', () => {
      expect(response.policyDocument).toEqual(policyDocument);
    });

    it('should always trim whitespaces around the token and normalize sub encoded in the token ', () => {
      expect(response.principalId).toEqual('auth0|hellogreat');
    });
  });

  it(`should allow access when the token is "Bearer "`, async () => {
    const authorizationToken = 'Bearer ';

    const event = {
      authorizationToken,
      methodArn: 'methodArn'
    };

    const res = await handler(event);

    expect(res).toEqual({
      context: {},
      policyDocument,
      principalId: 'Guest|mock-uuid'
    });
  });

  it(`should allow access when the token is empty ""`, async () => {
    const authorizationToken = '';

    const event = {
      authorizationToken,
      methodArn: 'methodArn'
    };

    const res = await handler(event);

    expect(res).toEqual({
      context: {},
      policyDocument,
      principalId: 'Guest|mock-uuid'
    });
  });

  it('should deny access for users with invalid token (either incorrect secret or expired) and send an unauthorized repsonse', async () => {
    const authorizationTokenWithWhitespace = `Bearer ${HS256_JWT_TOKEN_EXPIRED}`;
    const event = {
      authorizationToken: authorizationTokenWithWhitespace,
      methodArn: 'methodArn'
    };

    try {
      handler(event);
    } catch (error) {
      expect(error).toBe('Unauthorized');
    }
  });
});
