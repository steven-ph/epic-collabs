import { get } from 'lodash';
import { logger } from '../../utils/logger';
import { makeValidateToken } from './make-validate-token';
import { getPublicKey } from './get-public-key';
import { getSecret } from './get-secret';

const validateToken = makeValidateToken({
  getPublicKey,
  getSecret
});

const handler = async event => {
  const authorizationToken = get(event, 'authorizationToken') || '';
  const jwtToken = authorizationToken
    .replace(new RegExp(/^(Bearer)/g), '')
    .trimLeft()
    .trimRight();

  if (!jwtToken) {
    return generateResponse({
      principalId: null,
      Resource: get(event, 'methodArn')
    });
  }
  try {
    const token = await validateToken({ jwtToken });

    return handleResponse({ token, event });
  } catch (error) {
    logger.warn('Invalid or expired token', null, { event });

    return generateResponse({
      principalId: null,
      Resource: get(event, 'methodArn')
    });
  }
};

const normaliseUserId = (userId = '') => userId.replace(/[.$\[\]#\/]/g, '');

const handleResponse = async ({ token, event }) => {
  const principalId = normaliseUserId(get(token, 'sub', '')) || null;

  return generateResponse({
    principalId,
    Resource: get(event, 'methodArn'),
    context: {}
  });
};

const generateResponse = ({ principalId, context = {}, Resource }) => ({
  principalId,
  policyDocument: {
    Version: '2012-10-17',
    Statement: [
      {
        Action: 'execute-api:Invoke',
        Effect: 'Allow',
        Resource
      }
    ]
  },
  context
});

export { handler };
