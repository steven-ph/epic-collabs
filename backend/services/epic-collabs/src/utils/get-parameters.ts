import { makeKloudStore } from '@sp-tools/kloud-parameter';
import { memoize } from 'lodash';

const { stage } = process.env;
const configPath = `/${stage}/epic-collabs/config`;
const secretPath = `/${stage}/epic-collabs/secret`;

export interface Parameters {
  MONGODB_URL: string;
}

const kloudStore = makeKloudStore({
  configPath,
  secretPath,
  provider: {
    tableName: `kloud-config-epic-collabs-service-${stage}`
  }
});

export const getParameters = memoize(
  (): Promise<Parameters> => {
    return Promise.all([kloudStore.getConfigs([]), kloudStore.getSecrets(['MONGODB_URL'])]).then(([configs, secrets]) => Object.assign(configs, secrets));
  }
);
