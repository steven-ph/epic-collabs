import { memoize } from 'lodash';
import { makeKloudStore } from '@sp-tools/kloud-parameter';

const { STAGE } = process.env;
const configPath = `/${STAGE}/epic-collabs/config`;
const secretPath = `/${STAGE}/epic-collabs/secret`;

export interface Parameters {
  AUTH0_SECRET: string;
  AUTH0_JWKS_ENDPOINT: string;
  MONGO_DB_URL: string;
}

const { getConfigs, getSecrets } = makeKloudStore({
  configPath,
  secretPath,
  provider: {
    tableName: `kloud-config-epic-collabs-service-${STAGE}`
  }
});

const getParameters = memoize(
  (): Promise<Parameters> => {
    return Promise.all([getConfigs(['AUTH0_JWKS_ENDPOINT']), getSecrets(['AUTH0_SECRET', 'MONGO_DB_URL'])]).then(([configs, secrets]) => Object.assign(configs, secrets));
  }
);

export { getParameters };
