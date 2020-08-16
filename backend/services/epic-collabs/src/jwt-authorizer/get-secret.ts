import { get } from 'lodash';
import { kloudStore } from '../utils/get-parameters';

const getSecret = async ({ audience }) => {
  try {
    const { AUTH0_SECRET: base64SecretsMap } = await kloudStore.getSecrets(['AUTH0_SECRET']);
    const secrets = JSON.parse(Buffer.from(base64SecretsMap, 'base64').toString());

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
