import { memoize } from 'lodash';
import jwksClient from 'jwks-rsa';
import { kloudStore } from '../utils/get-parameters';

const getClient = async () => {
  const { AUTH0_JWKS_ENDPOINT } = await kloudStore.getConfigs(['AUTH0_JWKS_ENDPOINT']);

  if (!AUTH0_JWKS_ENDPOINT) {
    throw new Error('Jwks Uri is required');
  }

  return jwksClient({
    jwksUri: AUTH0_JWKS_ENDPOINT
  });
};

const getJwksClient = memoize(async () => {
  return getClient();
});

export { getJwksClient };
