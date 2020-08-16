import { memoize } from 'lodash';
import { makeKloudStore } from '@sp-tools/kloud-parameter';

const { STAGE } = process.env;
const configPath = `/${STAGE}/epic-collabs/config`;
const secretPath = `/${STAGE}/epic-collabs/secret`;

export interface Parameters {
  MONGO_DB_URL: string;
}

const kloudStore = makeKloudStore({
  configPath,
  secretPath,
  provider: {
    tableName: `kloud-config-epic-collabs-service-${STAGE}`
  }
});

const getParameters = memoize(
  (): Promise<Parameters> => {
    return Promise.all([kloudStore.getConfigs([]), kloudStore.getSecrets(['MONGO_DB_URL'])]).then(([configs, secrets]) => Object.assign(configs, secrets));
  }
);

export { kloudStore, getParameters };
