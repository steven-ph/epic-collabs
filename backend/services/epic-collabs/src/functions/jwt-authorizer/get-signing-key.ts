import { promisify } from 'util';
import { getJwksClient } from './get-jwks-client';

const getSigningKey = async ({ kid }) => {
  const jwksClient = await getJwksClient();

  const promisifiedGetSigningKey = promisify(jwksClient.getSigningKey);
  return promisifiedGetSigningKey(kid);
};

export { getSigningKey };
