import { get } from 'lodash';
import { getParameters } from '../../utils/get-parameters';

const getSecret = async ({ audience }) => {
  try {
    const { AUTH0_SECRET } = await getParameters();
    const secrets = JSON.parse(Buffer.from(AUTH0_SECRET, 'base64').toString());

    const secret = get(secrets, audience);

    if (!secret) {
      throw new Error(`Could not find secret for audience: [${audience}]`);
    }

    return secret;
  } catch (e) {
    throw new Error('Unable to get secret');
  }
};

export { getSecret };
