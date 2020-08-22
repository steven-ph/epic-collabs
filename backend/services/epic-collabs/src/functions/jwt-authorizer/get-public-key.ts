import { get } from 'lodash';
import { getSigningKey } from './get-signing-key';

const getPublicKey = async ({ kid }) => {
  const key = await getSigningKey({ kid });
  const publicKey = get(key, 'publicKey') || get(key, 'rsaPublicKey');

  if (!publicKey) {
    throw new Error('Could not get public key');
  }

  return publicKey;
};

export { getPublicKey };
