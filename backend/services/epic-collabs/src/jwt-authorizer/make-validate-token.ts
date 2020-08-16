import { get } from 'lodash';
import jwt from 'jsonwebtoken';

const makeValidateToken = ({ getPublicKey, getSecret }) => async ({ jwtToken }) => {
  const decoded = jwt.decode(jwtToken, { complete: true });

  if (!decoded) {
    throw new Error('Could not decode user token');
  }

  const alg = get(decoded, 'header.alg') || '';
  const kid = get(decoded, 'header.kid') || '';
  const aud = get(decoded, 'payload.aud') || '';

  if (alg.toUpperCase() === 'RS256') {
    const publicKey = await getPublicKey({ kid });
    return jwt.verify(jwtToken, publicKey);
  }

  const secret = await getSecret({ audience: aud });

  return jwt.verify(jwtToken, secret);
};

export { makeValidateToken };
