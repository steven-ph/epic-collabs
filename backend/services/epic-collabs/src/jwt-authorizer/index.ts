import { get } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { makeValidateToken } from './make-validate-token';
import { getPublicKey } from './get-public-key';
import { getSecret } from './get-secret';

const getGuestPrincipalIdFromEvent = event => {
  const principalId = get(event, 'requestContext,requestId') || uuidv4();

  return `Guest|${principalId}`;
};

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
      event,
      principalId: null,
      Resource: get(event, 'methodArn')
    });
  }
  try {
    const token = await validateToken({ jwtToken });
    return handleResponse({ token, event });
  } catch (error) {
    console.log({ error });
    throw new Error('Unauthorized');
  }
};

const normaliseUserId = (userId = '') => userId.replace(/[.$\[\]#\/]/g, '');

const handleResponse = async ({ token, event }) => {
  const principalId = normaliseUserId(get(token, 'sub', '')) || null;

  return generateResponse({
    principalId,
    event,
    Resource: get(event, 'methodArn'),
    context: {}
  });
};

const generateResponse = ({ principalId, event = {}, context = {}, Resource }) => ({
  principalId: principalId ? principalId : getGuestPrincipalIdFromEvent(event),
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
